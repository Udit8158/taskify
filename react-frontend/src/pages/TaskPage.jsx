import { useEffect } from "react";
import AddTask from "../components/TaskPage/AddTask";
import TaskContainer from "../components/TaskPage/TaskContainer";
import useTasksStore from "../store/useTasksStore";
import TaskDetails from "../components/TaskPage/TaskDetails";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router";
import { Modal } from "@mui/material";

export default function TaskPage() {
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  const taskDetailsOn = useTasksStore((state) => state.taskDetailsOn);
  const taskDetails = useTasksStore((state) => state.taskDetails);

  const navigate = useNavigate();

  // console.log(fetchTasks);
  useEffect(() => {
    fetchTasks();

    // you can clean the tasks in unmouunt
    // but for now I don't need that in my app
  }, []);

  function signOutHandler() {
    localStorage.setItem("auth-token", null);
    navigate("/signin");
  }

  return (
    <main className="h-screen flex flex-col">
      <div className="flex justify-end p-4">
        <Button
          text="Sign Out"
          aditionalClasses={"px-5 py-20 text-sm"}
          onClickHandler={signOutHandler}
          varient={"small"}
        />
      </div>
      <AddTask />

      {taskDetailsOn && (
        <TaskDetails
          key={taskDetails.id}
          id={taskDetails.id}
          title={taskDetails.title}
          description={taskDetails.description}
          state={taskDetails.state}
          difficulty={taskDetails.difficulty}
        />
      )}
      <div className="grid grid-cols-4 mx-10 2xl:mx-30 gap-12 h-full pb-4">
        <TaskContainer category={"Todo"} state={"todo"} />
        <TaskContainer category={"In Progress"} state={"progress"} />
        <TaskContainer category={"Review"} state={"review"} />
        <TaskContainer category={"Finished"} state={"finished"} />
      </div>
    </main>
  );
}
