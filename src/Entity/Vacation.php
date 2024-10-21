<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\VacationRepository;
use App\State\VacationSetOwnerProcessor;
use App\Validator\VacationDaysNumber;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Attribute\Context;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: VacationRepository::class)]
#[ApiResource(
    shortName: 'vacation_requests',
    normalizationContext: ['groups' => ['vacation:read']],
    denormalizationContext: ['groups' => ['vacation:write']],
    security: "is_granted('ROLE_USER')",
    processor: VacationSetOwnerProcessor::class
)]
#[VacationDaysNumber]
class Vacation
{
    use TimestampableEntity;

    #[Groups(['vacation:read'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'format' => 'date'
        ]
    )]
    #[Assert\NotBlank]
    #[Context([DateTimeNormalizer::FORMAT_KEY => 'Y-m-d'])]
    #[Groups(['vacation:read', 'vacation:write'])]
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $start_date = null;

    #[Assert\NotBlank]
    #[Groups(['vacation:read', 'vacation:write'])]
    #[ORM\Column]
    private ?int $days_number = null;

    #[ApiProperty(
        openapiContext: [
            'type' => 'string',
            'format' => 'date'
        ]
    )]
    #[Assert\NotBlank]
    #[Context([DateTimeNormalizer::FORMAT_KEY => 'Y-m-d'])]
    #[Groups(['vacation:read', 'vacation:write'])]
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $end_date = null;

    #[Groups(['vacation:read', 'vacation:write'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $comment = null;


    #[ORM\ManyToOne(inversedBy: 'vacations')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->start_date;
    }

    public function setStartDate(\DateTimeInterface $start_date): static
    {
        $this->start_date = $start_date;

        return $this;
    }

    public function getDaysNumber(): ?int
    {
        return $this->days_number;
    }

    public function setDaysNumber(int $days_number): static
    {
        $this->days_number = $days_number;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->end_date;
    }

    public function setEndDate(\DateTimeInterface $end_date): static
    {
        $this->end_date = $end_date;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    #[Groups(['vacation:read'])]
    public function getUserId(): int
    {
        return $this->user->getId();
    }
}
