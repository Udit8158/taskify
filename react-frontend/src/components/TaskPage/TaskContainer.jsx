import React, { memo, useEffect, useRef } from "react";
import TaskElement from "./TaskElement";
import { Plus } from "lucide-react";
import useTasksStore from "../../store/useTasksStore";
import { updateTask } from "../../utils/updateTask";
import { CircularProgress } from "@mui/material";
import useAutoHideError from "../../hooks/useAutoHideError";
import Alert from "../UI/Alert";

export default memo(function TaskContainer({ category, state }) {
  const containerRef = useRef();
  //   const tasks = useTasksStore((state) => state.tasks);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  //   const filteredTasks = tasks.filter((task) => task.state === state);
  const isLoading = useTasksStore((state) => state.loading);
  const getTasksByState = useTasksStore((state) => state.getTasksByState);
  const filteredTasks = getTasksByState(state); // getting tasks in each cotainer by state

  const { autoHideError, setAutoHideError } = useAutoHideError({ time: 4000 });

  // catch the drop
  useEffect(() => {
    const dragOverListener = containerRef.current.addEventListener(
      "dragover",
      (e) => {
        e.preventDefault();
        containerRef.current.classList.add("bg-[#F9E4A4]/50");
      }
    );

    const dragLeaveListener = containerRef.current.addEventListener(
      "dragleave",
      (e) => {
        e.preventDefault();
        containerRef.current.classList.remove("bg-[#F9E4A4]/50");
      }
    );

    const dropListener = containerRef.current.addEventListener(
      "drop",
      async (e) => {
        e.preventDefault();
        containerRef.current.classList.remove("bg-[#F9E4A4]/50");
        const task = JSON.parse(e.dataTransfer.getData("application/json"));

        // only update (server call) when state is changing while drag and drop
        if (task.state !== state) {
          const res = await updateTask({
            id: task.id,
            title: task.title,
            description: task.description,
            state: state, // update with current state
            difficulty: task.difficulty,
          });

          // after than fetch all in task ans set the state with new ones
          if (!res.error) {
            fetchTasks();
          } else {
            setAutoHideError("Error occured in server!");
          }
        }
      }
    );

    // remove at unmount
    return () => {
      removeEventListener("dragover", dragOverListener);
      removeEventListener("drop", dropListener);
      removeEventListener("dragleave", dragLeaveListener);
    };
  }, []);

  //   let tasks = useTasksStore((state) => state.tasks);

  return (
    <div
      ref={containerRef}
      className="bg-[#F9E4A4]/20 rounded-xl  p-4 pb-0 flex flex-col gap-5 h-[80vh] "
    >
      <div className="flex justify-between items-center sticky top-0">
        <div className="flex gap-2">
          <p className="text-xl">{category}</p>
          <span className="bg-orange-500 w-6 h-6 rounded-[50%] flex justify-center ">
            {filteredTasks.length}
          </span>
        </div>
        <Plus
          color="#ffffff"
          size={"30px"}
          className="hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer"
        />
      </div>

      <div
        className="overflow-y-scroll scroll-smooth flex flex-col gap-5 rounded-xl"
        style={{ scrollbarWidth: "none" }}
      >
        {isLoading && <CircularProgress color="inherit" className="mx-auto" />}
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
      {autoHideError && <Alert message={autoHideError} />}
    </div>
  );
});
