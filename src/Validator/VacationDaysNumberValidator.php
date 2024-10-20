<?php

namespace App\Validator;

use App\Entity\Vocation;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class VacationDaysNumberValidator extends ConstraintValidator
{
    public function validate(mixed $value, Constraint $constraint): void
    {
        /* @var VacationDaysNumber $constraint */

        if (null === $value || '' === $value) {
            return;
        }

        /* @var Vocation $value*/
        $start_day = $value->getStartDate();
        $end_day = $value->getEndDate();
        $days_number = $value->getDaysNumber();

        $result_days_number = date_diff($start_day, $end_day)->d;
        if ($result_days_number != $days_number) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ days_number }}', $days_number)
                ->setParameter('{{ result_days_number }}', $result_days_number)
                ->addViolation();
        }
    }
}
