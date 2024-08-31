import { createBrowserRouter, RouteObject } from "react-router-dom";
import SignIn from "../pages/sign/sign-in";
import SignUp from "../pages/sign/sign-up";

const route: RouteObject[] = [
  {
    path: "/",
    element: <SignIn></SignIn>,
  },
  {
    path: "/sign-up",
    element: <SignUp></SignUp>,
  },
];

export const router = createBrowserRouter(route);
