import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
};

export default App;
