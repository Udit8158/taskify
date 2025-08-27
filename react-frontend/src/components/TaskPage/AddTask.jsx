import React, { useState } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import { Plus } from "lucide-react";
import { validateInput } from "../../utils/validateInput";
import { addTask } from "../../utils/addTask";
import useAutoHideFeedback from "../../hooks/useAutoHideFeedback";
import Alert from "../UI/Alert";
import useTasksStore from "../../store/useTasksStore";

export default function AddTask() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDifficulty, setTaskDifficulty] = useState(null);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);

  const taskTitleInputErr = validateInput("taskTitle", taskTitle);
  const taskDifficultyInputErr = validateInput(
    "taskDifficulty",
    taskDifficulty
  );

  const { autoHideFeedback, setAutoHideFeedback } = useAutoHideFeedback({
    time: 5,
  });

  async function addTaskBtnHandler() {
    // no input error (passed the validation check)

    if (!taskTitleInputErr && !taskDifficultyInputErr) {
      await addTask({ title: taskTitle, difficulty: taskDifficulty });
      await fetchTasks(); // fetch from server and set to state to re render
      setAutoHideFeedback({
        type: "success",
        message: "Task added in todo 🎯",
      });
    } else {
      // else feeback the error
      setAutoHideFeedback({
        type: "error",
        message: "Provide valid task title and choose difficulty 😔",
      });
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
      {autoHideFeedback && (
        <Alert
          type={autoHideFeedback.type}
          message={autoHideFeedback.message}
        />
      )}
    </>
  );
}
