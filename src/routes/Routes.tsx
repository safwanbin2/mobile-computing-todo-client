import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../components/layouts/mainLayout/MainLayout";
import Create from "../pages/create/Create";
import UpdateTodo from "../pages/update/UpdateTodo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/update/:id",
        element: <UpdateTodo />,
      },
    ],
  },
]);

export default router;
