import { RouterProvider } from "react-router";
import router from "./routers/routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
