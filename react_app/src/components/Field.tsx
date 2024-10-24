import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import {addDays, format, subDays} from "date-fns";

import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface FieldProps<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  name: Path<TFieldValues>;
  placeholder: string;
  type: string;
  step?: string;
  required?: boolean;
  errors: Partial<DeepMap<TFieldValues, FieldError>>;
}

const Field = <TFieldValues extends FieldValues>({
  register,
  name,
  placeholder,
  type,
  step,
  required = false,
  errors,
}: FieldProps<TFieldValues>) => {

  const inputProps: { className: string; "aria-invalid"?: boolean } = {
    className: "form-control",
  };

  if (errors[name]) {
    inputProps.className += " is-invalid";
    inputProps["aria-invalid"] = true;
  }

  if (!errors[name]) {
    inputProps.className += " is-valid";
  }

  return (
    <div className="form-group">
      <label className="form-control-label" htmlFor={name}>
        {name}
      </label>
      {type === "date" ? (
        <input
          id={name}
          placeholder={placeholder}
          type="date" // Standard HTML input type
          {...inputProps}
          {...register(name, {
            ...(required && {required: "Required"}),
            //valueAsDate: true, // Ensure value is treated as a date
          })}
          min={new Date().toISOString().split("T")[0]} // Disable past dates
        />
      ) : (
        <input
          id={name}
          placeholder={placeholder}
          type={type}
          step={step}
          {...inputProps}
          {...register(name, {
            ...(required && {required: "Required"}),
            valueAsNumber: type === "number",
          })}
        />
      )}
      {errors[name] && (
        <div className="invalid-feedback">{errors[name]?.message}</div>
      )}
    </div>
  );
};

export default Field;
