import { z } from "zod";

const createTodoValidationSchema = z.object({
  title: z
    .string()
    .min(1, "Title can not be empty")
    .max(255, "Can not be more than 255 character"),
});

export const validationSchema = {
  createTodoValidationSchema,
};
