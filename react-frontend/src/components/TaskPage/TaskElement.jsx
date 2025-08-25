import { Cross, X } from "lucide-react";
import React from "react";

export default function TaskElement({ title, description, state, difficulty }) {
  return (
    <div className="bg-gray-2 rounded-xl flex flex-col p-2.5 gap-2">
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
        />
      </div>
      <p className="font-semibold text-xl">{title}</p>
      <p className="text-white/50">{description}</p>
    </div>
  );
}
