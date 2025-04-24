import Container from "../../components/Container";
import CreateTodoForm from "../../components/ui/create/CreateTodoForm";

const Create = () => {
  return (
    <div>
      <Container className="space-y-10">
        <div>
          <h1 className="text-sm text-gray-500">create</h1>
          <h3 className="text-xl">New Todo</h3>
        </div>

        <>
          <CreateTodoForm />
        </>
      </Container>
    </div>
  );
};

export default Create;
