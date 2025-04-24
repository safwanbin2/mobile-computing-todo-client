import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import UpdateTodoForm from "../../components/ui/update/UpdateTodoForm";
import { useQuery } from "@tanstack/react-query";

const UpdateTodo = () => {
  const { id } = useParams();

  const { data: todo, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost/todo/server/todo?id=${id}`
      );
      const data = await response.json();
      return data;
    },
  });

  return (
    <div>
      <Container className="space-y-10">
        <div>
          <h1 className="text-sm text-gray-500">Update</h1>
          <h3 className="text-xl">Todo - {id}</h3>
        </div>

        <>
          {!isPending && todo?.data?.title ? (
            <UpdateTodoForm todo={todo?.data} />
          ) : (
            <h2>loading...</h2>
          )}
        </>
      </Container>
    </div>
  );
};

export default UpdateTodo;
