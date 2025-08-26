import React, { useState } from "react";

export default function Select({ onChangeInputSetter, inputErr }) {
  const [showErr, setShowErr] = useState(false);
  return (
    <div>
      <select
        name="task-difficulty"
        className="outline-none bg-white  pr-8 pl-2 py-4 rounded-md text-black/60 cursor-pointer"
        onChange={(e) => onChangeInputSetter(e.target.value)}
        defaultValue={null}
        onBlur={() => setShowErr(true)}
      >
        <option value={null} className="">
          How hard is it?
        </option>
        <option value={"easy"}>Easy</option>
        <option value={"medium"}>Medium</option>
        <option value={"hard"}>Hard</option>
      </select>
      {showErr && inputErr && (
        <p className="text-sm text-red-400 absolute top-25">{inputErr}</p>
      )}
    </div>
  );
}
