import { Navigate, RouteObject } from "react-router-dom";
import EmpHome from "../pages/employee/emp-home";
import Home from "../pages/guest/home";
import SignIn from "../pages/sign/sign-in";
import SignUp from "../pages/sign/sign-up";
import ProtectedRoute from "./protected-route";

const createRoutes = (isAuthenticated: boolean): RouteObject[] => {
  return [
    {
      path: "/",
      element: <Navigate to="/login"></Navigate>,
    },
    {
      path: "/login",
      element: <SignIn></SignIn>,
    },
    {
      path: "/sign-up",
      element: <SignUp></SignUp>,
    },
    {
      path: "/guest",
      element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
      children: [
        {
          path: "",
          element: <Home></Home>,
        },
      ],
    },
    {
      path: "/emp",
      element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
      children: [
        {
          path: "",
          element: <EmpHome></EmpHome>,
        },
      ],
    },
  ];
};

export default createRoutes;
