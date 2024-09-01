import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import SignIn from "../pages/sign/sign-in";
import SignUp from "../pages/sign/sign-up";
import ProtectedRoute from "./protected-route";
import Home from "../pages/guest/home";

const route: RouteObject[] = [
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
    element: <ProtectedRoute isAuthenticated={true} />,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
    ],
  },
];

export const router = createBrowserRouter(route);
