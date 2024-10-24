import {useEffect, useState} from "react";
import {useForm, SubmitHandler, Controller} from "react-hook-form";
import Field from "../Field";

import TResource from "./type";
import { SubmissionError, TError } from "../../utils/types";
import {addDays, differenceInDays} from "date-fns";

interface FormProps {
  onSubmit: (item: Partial<TResource>) => any;
  initialValues?: Partial<TResource>;
  error?: TError;
  reset: () => void;
}

const Form = ({ onSubmit, error, reset, initialValues }: FormProps) => {
  const {
    register,
    setError,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<TResource>({
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : undefined,
  });

  // State to manage end date and whether it was manually modified
  const [endDate, setEndDate] = useState<Date | null>(
    initialValues?.end_date ? new Date(initialValues.end_date) : null
  );
  const [isEndDateManual, setIsEndDateManual] = useState(false);

  // Watch start_date and days_number
  const startDate = watch("start_date");
  const daysNumber = watch("days_number");

  // Recalculate days_number if the user manually changes end_date
  useEffect(() => {
    if (startDate && endDate && isEndDateManual) {
      const days = differenceInDays(new Date(endDate), new Date(startDate));
      setValue("days_number", days); // Update days_number
    }
  }, [endDate, startDate, setValue, isEndDateManual]);

  // If days_number changes, recalculate end_date
  useEffect(() => {
    if (startDate && daysNumber) {
      const newEndDate = addDays(new Date(startDate), daysNumber);
      setEndDate(newEndDate); // Reset end_date after days_number change
      setIsEndDateManual(false); // Reset manual flag
      setValue("end_date", newEndDate.toISOString().split("T")[0]); // Update form
    }
  }, [daysNumber, startDate, setValue]);

  // Handle errors
  useEffect(() => {
    if (error instanceof SubmissionError) {
      Object.keys(error.errors).forEach((errorPath) => {
        if (errors[errorPath as keyof TResource]) {
          return;
        }
        setError(errorPath as keyof TResource, {
          type: "server",
          message: error.errors[errorPath],
        });
      });

      reset();
    }
  }, [error, errors, reset, setError]);

  const onFormSubmit: SubmitHandler<TResource> = (data) => {
    onSubmit({
      ...data,
    });
  };

  // Handle manual change of end_date
  const handleEndDateChange = (date: Date | null) => {
    setIsEndDateManual(true); // Mark the end_date as manually changed
    setEndDate(date);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Field
        register={register}
        name="start_date"
        placeholder="start date"
        type="date"
        required
        errors={errors}
      />
      <Field
        register={register}
        name="days_number"
        placeholder="days quantity"
        type="number"
        required
        errors={errors}
      />
      <Controller
        name="end_date"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="date"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            placeholder="End Date"
            onChange={(e) => handleEndDateChange(e.target.value ? new Date(e.target.value) : null)}
            className={`form-control ${errors.end_date ? "is-invalid" : ""}`}
          />
        )}
      />
      {/*<Field
        register={register}
        name="end_date"
        placeholder="end date"
        type="string"
        required
        errors={errors}
      />*/}
      <Field
        register={register}
        name="comment"
        placeholder="comment"
        type="text"
        errors={errors}
      />


      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};

export default Form;
