<?php

namespace App\Controller;

use App\Service\RegistrationService;
use Exception;
use Rollerworks\Component\PasswordStrength\Validator\Constraints as RollerworksPassword;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Serializer\Exception\ExceptionInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiSecurityController extends AbstractController
{
    const string VERIFY_URL = "app_api_verify";
    public function __construct(
        private readonly RegistrationService $registrationService,
        private readonly NormalizerInterface $normalizer,
    ) {}

    #[Route('api/register', name: 'app_api_register', methods: ['POST'])]
    public function register(Request $request, ValidatorInterface $validator): Response
    {
        $email = $request->getPayload()->get('email');
        if (empty($email)) {
            return $this->json(
                [
                    'message' => 'Email should be not empty.',
                ],
                Response::HTTP_BAD_REQUEST,
            );
        }
        $errors = $validator->validate(
            $email,
            new Assert\Email(),
        );
        if (count($errors) > 0) {
            return $this->json(
                [
                    'message' => $errors[0]->getMessage(),
                ],
                Response::HTTP_BAD_REQUEST,
            );
        }
        if ($this->registrationService->isUserRegistered($email)) {
            return $this->json(
                [
                    'message' => 'Email already exists.',
                ],
                Response::HTTP_CONFLICT,
            );
        }
        $password = $request->getPayload()->get('password');
        if (empty($password)) {
            return $this->json(
                [
                    'message' => 'Password should be not empty.',
                ],
                Response::HTTP_BAD_REQUEST,
            );
        }
        $errors = $validator->validate(
            $password,
            new RollerworksPassword\PasswordRequirements([
                'minLength' => 8,
                'requireCaseDiff' => true,
                'requireNumbers' => true,
                'requireSpecialCharacter' => true,
                'tooShortMessage' => 'Password should be at least 8 characters long.',
                'requireCaseDiffMessage' => 'Password should contain at least 1 uppercase letter.',
                'missingNumbersMessage' => 'Password must include at least one number.',
                'missingSpecialCharacterMessage' => 'Password must contain at least one special character (e.g. !@#$%^&).'
            ]),
        );
        if (count($errors) > 0) {
            return $this->json(
                [
                    'message' => $errors[0]->getMessage(),
                ],
                Response::HTTP_BAD_REQUEST,
            );
        }
        try {
            $user = $this->registrationService->registerUser($email, $password, self::VERIFY_URL);
            return $this->json(
                [
                    'message' => 'Verification email sent',
                ],
                Response::HTTP_CREATED
            );
        } catch (Exception $e) {
            return $this->json(
                [
                    'message' => $e->getMessage(),
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR,
            );
        }
    }

    #[Route('api/verify_registration', name: self::VERIFY_URL)]
    public function verify(Request $request): Response
    {
        if ($id = $request->get('id')) {
            try {
                $this->registrationService->verifyAccount($id, $request->getUri());
                return $this->json(
                    [
                        'message' => 'You email has been verified!',
                    ],
                    Response::HTTP_CREATED,
                );
            } catch (Exception $e) {
                return $this->json(
                    [
                        'message' => $e->getMessage(),
                    ],
                    Response::HTTP_BAD_REQUEST,
                );
            }
        }
        return $this->json(
            [
                'message' => 'The link is broken'
            ],
            Response::HTTP_BAD_REQUEST,
        );
    }

    #[Route(path: 'api/login', name: 'app_api_login', methods: ['POST'])]
    public function login(#[CurrentUser] $user = null): Response
    {
        if ($this->registrationService->isAccountVerified($user->getEmail())) {
            try {
                return $this->json(
                    $this->normalizer->normalize($user, 'array', ['groups' => 'user:read'])
                    , Response::HTTP_OK
                );
            } catch (ExceptionInterface $e) {
                return $this->json([
                    'message' => 'Could not normalize user: ' . $e->getMessage(),
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
        return $this->json(
            [
                'message' => 'Account is not verified',
            ],
            Response::HTTP_BAD_REQUEST,
        );
    }

    #[Route(path: 'api/logout', name: 'app_api_logout')]
    public function logout(): Response
    {
        return $this->json([
            'message' => 'Successfully logged out',
        ], Response::HTTP_OK);
    }
}
