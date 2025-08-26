import { useEffect } from "react";
import AddTask from "../components/TaskPage/AddTask";
import TaskContainer from "../components/TaskPage/TaskContainer";
import useTasksStore from "../store/useTasksStore";

export default function TaskPage() {
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  // console.log(fetchTasks);
  useEffect(() => {
    fetchTasks();

    // you can clean the tasks in unmouunt
    // but for now I don't need that in my app
  }, []);

  return (
    <main>
      <AddTask />
      <div className="grid grid-cols-4 mx-30 gap-12 ">
        <TaskContainer category={"Todo"} state={"todo"} />
        <TaskContainer category={"In Progress"} state={"progress"} />
        <TaskContainer category={"Review"} state={"review"} />
        <TaskContainer category={"Finished"} state={"finished"} />
      </div>
    </main>
  );
}
