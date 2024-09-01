import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import SignIn from "../pages/sign/sign-in";
import SignUp from "../pages/sign/sign-up";
import ProtectedRoute from "./protected-route";
import Home from "../pages/guest/home";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

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
    // {
    //   path: "/home",
    //   element: <Navigate to="/guest"></Navigate>,
    //   children: [
    //     {
    //       path: "/guest",
    //       element: <Home></Home>,
    //     },
    //   ],
    // },
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
  ];
};

export default createRoutes;
