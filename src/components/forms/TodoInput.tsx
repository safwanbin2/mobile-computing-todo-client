import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  // type: "number" | "text" | "email" | "password";
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const TodoInput = ({
  name,
  // type,
  placeholder,
  required = false,
  className,
}: IProps) => {
  const controlls = useFormContext();
  return (
    <Controller
      {...controlls}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <textarea
            {...field}
            // type={type}
            placeholder={placeholder ?? name}
            required={required}
            // eslint-disable-next-line no-extra-boolean-cast
            className={`${
              error?.message ? "border-red-500" : ""
            } border p-1 ${className}`}
          />
          <p className="text-sm text-red-500 mb-2">{error?.message}</p>
        </div>
      )}
    />
  );
};

export default TodoInput;
