import { FieldValues, SubmitHandler } from "react-hook-form";
import TodoForm from "../../forms/TodoForm";
import TodoInput from "../../forms/TodoInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "../../../validations";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../main";
import { ITodo } from "../../../types/todo";
import { toast } from "sonner";

const defaultValues = {
  title: "",
};

const CreateTodoForm = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (newTodo: Partial<ITodo>) => {
      const response = await fetch(`http://localhost/todo/server/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const data = response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo created successfully!", {
        duration: 3000,
        id: "todos",
      });
    },
  });

  const handleCreateTodo: SubmitHandler<FieldValues> = (values) => {
    mutate(values);

    if (isError) {
      toast.error("Something went wrong!", { duration: 3000, id: "todo" });
    }

    navigate("/");
  };
  return (
    <div>
      <TodoForm
        onSubmit={handleCreateTodo}
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
            className="text-gray-700 border-gray-700 border px-3 py-1 rounded-md text-sm tracking-wider"
          >
            Creating...
          </button>
        ) : (
          <button
            type="submit"
            className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm tracking-wider"
          >
            Create Todo
          </button>
        )}
      </TodoForm>
    </div>
  );
};

export default CreateTodoForm;
