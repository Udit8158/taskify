import React, { useEffect, useRef } from "react";
import TaskElement from "./TaskElement";
import { Plus } from "lucide-react";
import useTasksStore from "../../store/useTasksStore";
import { updateTask } from "../../utils/updateTask";

export default function TaskContainer({ category, state }) {
  const containerRef = useRef();
  const updateTasks = useTasksStore((state) => state.updateTasks);

  // catch the drop
  useEffect(() => {
    const dragOverListener = containerRef.current.addEventListener(
      "dragover",
      (e) => e.preventDefault()
    );

    const dropListener = containerRef.current.addEventListener("drop", (e) => {
      e.preventDefault();
      const task = JSON.parse(e.dataTransfer.getData("application/json"));

      // updateTasks({
      //   id: task.id,
      //   title: task.title,
      //   description: task.description,
      //   state: task.state,
      //   difficulty: task.difficulty,
      // });

      // only update (server call) when state is changing while drag and drop
      if (task.state !== state) {
        updateTask({
          id: task.id,
          title: task.title,
          description: task.description,
          state: state, // update with current state
          difficulty: task.difficulty,
        });
      }
    });

    // remove at unmount
    return () => {
      removeEventListener("dragover", dragOverListener);
      removeEventListener("drop", dropListener);
    };
  }, []);

  let tasks = useTasksStore((state) => state.tasks);
  let filteredTasks = tasks.filter((task) => task.state === state);
  const isLoading = useTasksStore((state) => state.loading);

  //   if (state === "todo") {
  //     filteredTasks = tasks.filter((task) => task.state === "todo");
  //   }
  //   if (state === "progress") {
  //     console.log("here");
  //     filteredTasks = tasks.filter((task) => task.state === "progress");
  //   }

  //   console.log("Rendering", category);
  return (
    <div
      ref={containerRef}
      className="bg-[#F9E4A4]/20 rounded-xl  p-4 flex flex-col gap-6"
    >
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

      {isLoading && <p className="w-fit mx-auto">Loading your tasks...</p>}
      {filteredTasks.length > 0 &&
        filteredTasks.map((task) => (
          <TaskElement
            key={task._id}
            id={task._id}
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
