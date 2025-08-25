import React, { useState } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import { Plus } from "lucide-react";
import { validateInput } from "../../utils/validateInput";
import { addTask } from "../../utils/addTask";
import useAutoHideError from "../../hooks/useAutoHideError";
import Alert from "../UI/Alert";

export default function AddTask() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDifficulty, setTaskDifficulty] = useState(null);

  const taskTitleInputErr = validateInput("taskTitle", taskTitle);
  const taskDifficultyInputErr = validateInput(
    "taskDifficulty",
    taskDifficulty
  );

  const { autoHideError, setAutoHideError } = useAutoHideError({ time: 5 });

  function addTaskBtnHandler() {
    if (!taskTitleInputErr && !taskDifficultyInputErr) {
      addTask({ title: taskTitle, difficulty: taskDifficulty });
    } else {
      setAutoHideError("Provide valid task title and choose difficulty");
    }
  }

  return (
    <>
      <div className="flex justify-between items-center w-fit md:gap-20 lg:gap-40 mx-auto my-10">
        <Input
          placeholder="Add a task"
          pad="py-4"
          onChangeInputSetter={setTaskTitle}
          customClass="py-4 pr-18"
        />
        <Select onChangeInputSetter={setTaskDifficulty} />
        <Plus
          color="#ffffff"
          size={"50px"}
          className="hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer"
          onClick={addTaskBtnHandler}
        />
      </div>
      {autoHideError && (
        // <p className="mx-auto text-sm text-red-400 w-fit">{autoHideError}</p>
        <Alert type="error" message={autoHideError} />
      )}
    </>
  );
}
