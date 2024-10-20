<?php

namespace App\Service;


use App\Entity\User;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;
use SymfonyCasts\Bundle\VerifyEmail\VerifyEmailHelperInterface;


/**
 * New User Registration Service
 */
readonly class RegistrationService
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly MailerInterface $mailer,
        private readonly TranslatorInterface $translator,
        private readonly UserPasswordHasherInterface $passwordHasher,
        private readonly UserRepository $userRepository,
        private readonly VerifyEmailHelperInterface $verifyEmailHelper,
    ) {}

    public function isUserRegistered(string $email): bool
    {
        $user = $this->userRepository->findOneBy(['email' => $email]);
        return $user !== null;
    }

    /**
     * @throws Exception
     */
    public function registerUser(string $email, string $plaintextPassword, string $route): ?User
    {
        $user = new User();
        $user->setEmail($email);
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $plaintextPassword
        );
        $user->setPassword($hashedPassword);
        $user->setVerified(false);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $signatureComponents = $this->verifyEmailHelper->generateSignature(
            $route,
            $user->getId(),
            $user->getEmail(),
            ['id' => $user->getId()]
        );

        $message_text = 'Welcome! Follow next link to verify registration:  ' . $signatureComponents->getSignedUrl();
        $message_html = '<h3>Welcome</h3><a href="' . $signatureComponents->getSignedUrl() .
            '">Follow the link to verify registration!</a>';
        $message = (new Email())
            ->from($email)
            ->to('vocation@vocation.com')
            ->subject('Registration New User!')
            ->text($message_text)
            ->html($message_html);
        try {
            $this->mailer->send($message);
        } catch (TransportExceptionInterface $e) {
            throw new Exception($e->getMessage());
        }

        return $user;
    }

    /**
     * @throws Exception
     */
    public function verifyAccount(int $id, string $signedUrl): void
    {
        $user = $this->userRepository->find($id);
        if (!$user) {
            throw new Exception('User not found');
        }
        try {
            $this->verifyEmailHelper->validateEmailConfirmation(
                $signedUrl,
                $user->getId(),
                $user->getEmail()
            );
        } catch (VerifyEmailExceptionInterface $e) {
            throw new Exception($this->translator->trans($e->getReason()));
        }
        $user->setVerified(true);
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}
