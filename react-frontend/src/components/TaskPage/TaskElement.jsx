import { Cross, X } from "lucide-react";
import React, { memo, useEffect, useRef } from "react";
import useTasksStore from "../../store/useTasksStore";
import { deleteTask } from "../../utils/deleteTask";
import useAutoHideFeedback from "../../hooks/useAutoHideFeedback";
import Alert from "../UI/Alert";

export default memo(function TaskElement({
  id,
  title,
  description,
  state,
  difficulty,
  autoHideFeedback,
  setAutoHideFeedback,
}) {
  const taskElelementRef = useRef();
  const showTaskDetails = useTasksStore((state) => state.showTaskDetails);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);

  // add drag event listner
  useEffect(() => {
    const dragEventListener = taskElelementRef.current.addEventListener(
      "dragstart",
      (e) =>
        e.dataTransfer.setData(
          "application/json",
          JSON.stringify({ id, title, description, state, difficulty })
        )
    );

    // remove on unmount
    return () => removeEventListener("dragstart", dragEventListener);
  }, []);

  async function deleteTaskHandler(e) {
    console.log("clicked");
    e.stopPropagation(); // prevent from the parent on click trigger
    const res = await deleteTask(id);
    if (res.error)
      setAutoHideFeedback({
        type: "error",
        message: "Something bad happened 😔",
      });
    else {
      await fetchTasks(); // fetch latest tasks (and re render with new state)
      setAutoHideFeedback({
        type: "success",
        message: "Task deleted successfully 🚀",
      });
    }
  }
  return (
    <div
      ref={taskElelementRef}
      draggable={true}
      className="bg-gray-2 rounded-xl flex flex-col p-2.5 gap-2 cursor-pointer"
      onClick={() =>
        showTaskDetails({ id, title, description, state, difficulty })
      }
    >
      <div className="flex justify-between">
        {difficulty === "medium" && (
          <span className="bg-orange-2 px-2 py-1 rounded-3xl text-sm">
            {difficulty}
          </span>
        )}
        {difficulty === "hard" && (
          <span className="bg-orange-3 px-2 py-1 rounded-3xl text-sm text-black">
            {difficulty}
          </span>
        )}
        {difficulty === "easy" && (
          <span className="bg-orange-1 px-2 py-1 rounded-3xl text-sm ">
            {difficulty}
          </span>
        )}
        <X
          color="#ffffff"
          size={"25px"}
          className="hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer"
          onClick={deleteTaskHandler}
        />
      </div>
      <p className="font-semibold text-xl">
        {title.length > 30 ? title.slice(0, 30) + "..." : title}
      </p>
      <p className="text-white/50">
        {description.length > 90
          ? description.slice(0, 90) + "..."
          : description}
      </p>
      {autoHideFeedback && (
        <Alert
          type={autoHideFeedback.type}
          message={autoHideFeedback.message}
        />
      )}
    </div>
  );
});
