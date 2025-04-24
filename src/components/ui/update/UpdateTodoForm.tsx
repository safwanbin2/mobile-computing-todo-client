import { FieldValues, SubmitHandler } from "react-hook-form";
import TodoForm from "../../forms/TodoForm";
import TodoInput from "../../forms/TodoInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "../../../validations";
import { useNavigate } from "react-router-dom";
import { ITodo } from "../../../types/todo";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../main";
import { toast } from "sonner";

type TProps = {
  todo: ITodo;
};

const UpdateTodoForm = ({ todo }: TProps) => {
  const defaultValues = {
    title: todo?.title || "",
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: Partial<ITodo>) => {
      const response = await fetch(
        `http://localhost/todo/server/todo?id=${todo?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo updated successfully!", {
        duration: 3000,
        id: "todos",
      });
    },
  });

  const navigate = useNavigate();
  const handleUpdateTodo: SubmitHandler<FieldValues> = (values) => {
    mutate(values);
    // redirecting to home page
    navigate("/");
  };

  return (
    <div>
      <TodoForm
        onSubmit={handleUpdateTodo}
        defaultValues={defaultValues}
        resolver={zodResolver(validationSchema.createTodoValidationSchema)}
      >
        <TodoInput
          name="title"
          placeholder="What are you trying to do?"
          // required={true}
          className="w-full border-2 border-gray-400 rounded-md p-2 focus:outline-none"
        />
        {isPending ? (
          <button
            disabled
            className="border border-gray-700 text-gray-700 px-3 py-1 rounded-md text-sm tracking-wider"
          >
            Update Todo
          </button>
        ) : (
          <button
            type="submit"
            className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm tracking-wider"
          >
            Update Todo
          </button>
        )}
      </TodoForm>
    </div>
  );
};

export default UpdateTodoForm;
