import { RouteObject } from "react-router-dom";
import Unauthenticated from "../layouts/Unauthenticated";
import Authenticated from "../layouts/Authenticated";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Create from "../pages/Create";

const routes: RouteObject[] = [
  {
    element: <Authenticated />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "create",
        element: <Create />,
      },
    ],
  },
  {
    element: <Unauthenticated />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
];

export default routes;
