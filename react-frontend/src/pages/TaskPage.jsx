import { useEffect } from "react";
import AddTask from "../components/TaskPage/AddTask";
import TaskContainer from "../components/TaskPage/TaskContainer";
import useTasksStore from "../store/useTasksStore";
import TaskDetails from "../components/TaskPage/TaskDetails";

export default function TaskPage() {
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  const taskDetailsOn = useTasksStore((state) => state.taskDetailsOn);
  const taskDetails = useTasksStore((state) => state.taskDetails);

  // console.log(fetchTasks);
  useEffect(() => {
    fetchTasks();

    // you can clean the tasks in unmouunt
    // but for now I don't need that in my app
  }, []);

  return (
    <main>
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
      <div className="grid grid-cols-4 mx-30 gap-12 ">
        <TaskContainer category={"Todo"} state={"todo"} />
        <TaskContainer category={"In Progress"} state={"progress"} />
        <TaskContainer category={"Review"} state={"review"} />
        <TaskContainer category={"Finished"} state={"finished"} />
      </div>
    </main>
  );
}
