import { createBrowserRouter } from "react-router";
import App from "../App";
import SignUp from "../pages/SignUpPage";
import SignIn from "../pages/SignInPage";
import TaskPage from "../pages/TaskPage";

const router = createBrowserRouter([
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
