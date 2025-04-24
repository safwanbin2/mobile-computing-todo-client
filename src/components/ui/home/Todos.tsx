/* eslint-disable @typescript-eslint/no-unused-vars */
import TodoCard from "../../cards/TodoCard";
import { ITodo } from "../../../types/todo";
import { useQuery } from "@tanstack/react-query";
import { IResponse } from "../../../types/response";
import { useAtom } from "jotai";
import { searchAtom } from "../../../jotai/atoms";
import config from "../../../config";

const Todos = () => {
  const atom = useAtom(searchAtom);

  const {
    data: todos,
    isPending,
    isError,
  } = useQuery<IResponse<ITodo[]>>({
    queryKey: ["todos", atom[0]],
    queryFn: async () => {
      const response = await fetch(
        `${config.API_URL}/find?searchTerm=${atom[0]}`
      );
      const data = response.json();
      return data;
    },
  });

  if (isError) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div className="grid grid-cols-1">
      {isPending ? (
        <h2>Loading...</h2>
      ) : todos?.data?.length ? (
        todos?.data.map((todo) => <TodoCard key={todo?.id} todo={todo} />)
      ) : (
        <h2>No todos found!</h2>
      )}
    </div>
  );
};

export default Todos;
