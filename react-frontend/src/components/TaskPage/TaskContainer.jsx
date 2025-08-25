import React from "react";
import TaskElement from "./TaskElement";
import { Plus } from "lucide-react";
import useTasksStore from "../../store/useTasksStore";

export default function TaskContainer({ category }) {
  let tasks = [];
  let filteredTasks = [];
  const isLoading = useTasksStore((state) => state.loading);

  if (category === "Todo") {
    tasks = useTasksStore((state) => state.tasks);
    filteredTasks = tasks.filter((task) => task.state === "todo");
  }

  console.log(filteredTasks);

  //   console.log("Rendering", category);
  return (
    <div className="bg-[#F9E4A4]/20 rounded-xl  p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <p className="text-xl">{category}</p>
          <span className="bg-orange-500 w-6 h-6 rounded-[50%] flex justify-center ">
            4
          </span>
        </div>
        <Plus
          color="#ffffff"
          size={"30px"}
          className="hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer"
        />
      </div>

      {filteredTasks.length > 0 &&
        filteredTasks.map((task) => (
          <TaskElement
            key={task._id}
            title={task.title}
            description={task.description}
            state={task.state}
            difficulty={task.difficulty}
          />
        ))}

      {filteredTasks.length === 0 && (
        <p className="w-fit mx-auto">Nothing to show here 🥲</p>
      )}
    </div>
  );
}
