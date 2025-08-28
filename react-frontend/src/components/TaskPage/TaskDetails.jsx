import { Maximize2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useTasksStore from "../../store/useTasksStore";
import { updateTask } from "../../utils/updateTask";

export default function TaskDetails({
  id,
  title,
  description,
  state,
  difficulty,
}) {
  const hideTaskDetails = useTasksStore((state) => state.hideTaskDetails);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);

  const [inputTitle, setInputTitle] = useState(title);
  const [inputDescription, setInputDescription] = useState(description);
  const [inputState, setInputState] = useState(state); // task state - todo, progress etc
  const [inputDifficulty, setInputDifficulty] = useState(difficulty);

  const [pageWidth, setPageWidth] = useState(50);

  const detailsContainer = useRef();

  // when any of these input changes update latest on server
  useEffect(() => {
    async function updatAndFetch(params) {
      const res = await updateTask({
        id,
        title: inputTitle,
        description: inputDescription,
        state: inputState,
        difficulty: inputDifficulty,
      });

      if (!res.error) {
        fetchTasks();
      }
    }
    updatAndFetch();
  }, [inputTitle, inputDescription, inputDifficulty, inputState]);

  function toggleFullScreenHandler() {
    if (pageWidth === 50) {
      detailsContainer.current.classList.remove("w-[50vw]");
      detailsContainer.current.classList.add("w-[100vw]");
      setPageWidth(100);
    }
    if (pageWidth === 100) {
      detailsContainer.current.classList.remove("w-[100vw]");
      detailsContainer.current.classList.add("w-[50vw]");
      setPageWidth(50);
    }
  }

  return (
    <div
      className={`h-[100vh] absolute top-0 right-0 z-50 bg-gray-3 flex flex-col gap-10 p-6 w-[50vw]`}
      ref={detailsContainer}
    >
      <div className="flex justify-between  items-center gap-10">
        <X
          size={40}
          onClick={hideTaskDetails}
          className="hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer"
        />
        <Maximize2
          size={25}
          className="hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer"
          onClick={toggleFullScreenHandler}
        />
      </div>
      <textarea
        className="text-4xl outline-none w-full h-fit px-23"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
      />
      {/*  */}
      <div className="flex gap-10 px-23">
        <div className="grid grid-rows-2 gap-3 w-fit">
          <p className="opacity-70">State</p>
          <p className="opacity-70">Difficulty</p>
        </div>
        <div className="grid grid-rows-2 gap-3 w-full">
          {/* <p className="hover:opacity-50 w-full cursor-pointer transition-all ease-in-out duration-300">
            Todo
          </p> */}
          <select
            className="hover:opacity-50 cursor-pointer transition-all ease-in-out duration-300 outline-none"
            value={inputState}
            onChange={(e) => setInputState(e.target.value)}
          >
            <option value={"todo"}>Todo</option>
            <option value={"progress"}>In Progress</option>
            <option value={"review"}>Review</option>
            <option value={"finished"}>Finished</option>
          </select>

          <select
            className="hover:opacity-50 cursor-pointer transition-all ease-in-out duration-300 outline-none"
            value={inputDifficulty}
            onChange={(e) => setInputDifficulty(e.target.value)}
          >
            <option value={"easy"}>Easy</option>
            <option value={"medium"}>Medium</option>
            <option value={"hard"}>Hard</option>
          </select>
        </div>
      </div>

      {/*  */}
      <textarea
        className="px-23 outline-none "
        value={inputDescription}
        onChange={(e) => setInputDescription(e.target.value)}
      ></textarea>
    </div>
  );
}
