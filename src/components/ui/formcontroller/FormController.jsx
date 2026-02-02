import React from "react";
import { Controller } from "react-hook-form";
import { cn } from "../../../utils/cn";

const FormController = ({
  label,
  type = "text",
  control,
  name,
  placeholder,
  className,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("flex flex-col gap-2 w-full", className)}>
          {label && (
            <label
              htmlFor={name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            className={cn(
              "flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            {...field}
            {...props}
          />
          {error && (
            <span className="text-sm font-medium text-red-500">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default FormController;
