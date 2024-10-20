<?php

namespace App\Service;

use App\Entity\Card;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

readonly class UserHardDeleteService
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private HistoricLogService $historicLogService,
    ){}

    public function hardDeleteUser(User $user): void
    {
        $cards = $user->getCards();
        /* @var Card $card */
        foreach ($cards as $card) {
            if ($card->getRecipientEmail() && !$card->isDeletedByRecipient()) {
                $card->setOwner(null);
                $card->setIsPublished(false);
                $card->setIsDeletedBySender(true);
                $this->entityManager->persist($card);
                $this->historicLogService->storeHistoricCardLog($card);
            } else {
                $this->entityManager->remove($card);
            }
        }
        $this->entityManager->flush();

        $footprints = $user->getFootprints();
        /* @var Card $card */
        foreach ($footprints as $card) {
            if ($card->getOwner() && !$card->isDeletedBySender()) {
                $card->setRecipient(null);
                $card->setIsDeletedByRecipient(true);
                $this->entityManager->persist($card);
                $this->historicLogService->storeHistoricCardLog($card);
            } else {
                $this->entityManager->remove($card);
            }
        }
        $this->entityManager->flush();

        $this->entityManager->remove($user);
        $this->entityManager->flush();
    }
}