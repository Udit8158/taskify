import { X } from "lucide-react";
import React, { useState } from "react";
import useTasksStore from "../../store/useTasksStore";

export default function TaskDetails({ title, description, state, difficulty }) {
  const hideTaskDetails = useTasksStore((state) => state.hideTaskDetails);
  const [inputTitle, setInputTitle] = useState(title);
  return (
    <div className="h-[100vh] w-[50vw] absolute top-0 right-0 z-50 bg-gray-3 flex flex-col gap-10 p-6">
      <div className="flex  gap-10">
        <X
          size={50}
          onClick={hideTaskDetails}
          className="hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer"
        />
        <textarea
          className="text-4xl outline-none w-full h-fit"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
      </div>
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
            value={state}
          >
            <option value={"todo"}>Todo</option>
            <option value={"progress"}>In Progress</option>
            <option value={"review"}>Review</option>
            <option value={"finished"}>Finished</option>
          </select>

          <select
            className="hover:opacity-50 cursor-pointer transition-all ease-in-out duration-300 outline-none"
            value={difficulty}
          >
            <option value={"easy"}>Easy</option>
            <option value={"medium"}>Medium</option>
            <option value={"hard"}>Hard</option>
          </select>
        </div>
      </div>

      {/*  */}
      <textarea className="px-23 outline-none " value={description}></textarea>
    </div>
  );
}
