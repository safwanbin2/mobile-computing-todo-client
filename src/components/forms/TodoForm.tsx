import React from "react";
import {
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface IProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: Record<string, unknown>;
  resolver?: Resolver<FieldValues, unknown> | undefined;
}

const TodoForm = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
  // setting up config for form
  const config: Partial<IProps> = {};
  if (defaultValues) {
    config["defaultValues"] = defaultValues;
  }
  if (resolver) {
    config["resolver"] = resolver;
  }
  const methods = useForm(config);

  const { handleSubmit, reset } = methods;

  const handleFormSubmit = (values: FieldValues) => {
    onSubmit(values);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default TodoForm;

// test commit
