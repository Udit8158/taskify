import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import SignUp from "../pages/SignUpPage";
import SignIn from "../pages/SignInPage";
import TaskPage from "../pages/TaskPage";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/signin",
    Component: SignIn,
  },
  {
    path: "/app",
    Component: TaskPage,
  },
]);

export default router;
