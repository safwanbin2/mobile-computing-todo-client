import { ITodo } from "../../types/todo";
import { IoCheckmarkDone } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../main";

interface IProps {
  todo: ITodo;
}

const TodoCard = ({ todo }: IProps) => {
  const { id, title, isCompleted } = todo;

  const { mutate: deleteTodoMutation } = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(
        `http://localhost/todo/server/todo?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted successfully!", {
        duration: 3000,
        id: "todos",
      });
    },
    onError: () => {
      toast.error("Something went wrong!", {
        duration: 3000,
        id: "todo",
      });
    },
  });

  const handleDelete = async (id: number) => {
    const consent = window.confirm("Are you sure you want to delete the todo!");
    if (!consent) return;
    deleteTodoMutation(id);
  };

  const { mutate: markCompleteMutation } = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(
        `http://localhost/todo/server/mark-completed?id=${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo marked successfully!", {
        duration: 3000,
        id: "todos",
      });
    },
  });

  const handleMarkCompleted = (id: number) => {
    markCompleteMutation(id);
  };

  return (
    <div className="flex items-center border-b py-4 gap-4">
      <p className={`w-full text-xl ${isCompleted ? "line-through" : ""}`}>
        {title}
      </p>
      <div className="flex items-center justify-end gap-2">
        {isCompleted ? (
          <button
            disabled
            className="p-1 bg-gray-700 rounded-md text-white cursor-not-allowed"
          >
            <IoCheckmarkDone className="text-xl" />
          </button>
        ) : (
          <button
            onClick={() => handleMarkCompleted(id)}
            className="p-1 bg-gray-700 rounded-md text-white"
          >
            <IoCheckmarkDone className="text-xl" />
          </button>
        )}
        {isCompleted ? (
          <button
            disabled
            className="p-1 bg-gray-700 rounded-md text-white cursor-not-allowed"
          >
            <CiEdit className="text-xl" />
          </button>
        ) : (
          <Link
            to={`/update/${id}`}
            className="p-1 bg-gray-700 rounded-md text-white"
          >
            <CiEdit className="text-xl" />
          </Link>
        )}
        <button
          onClick={() => handleDelete(id)}
          className="p-1 bg-red-700 rounded-md text-white"
        >
          <MdOutlineDelete className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
