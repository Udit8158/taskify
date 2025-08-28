import React, { useState } from "react";
import Input from "../UI/Input";
import Select from "../UI/Select";
import { Plus } from "lucide-react";
import { validateInput } from "../../utils/validateInput";
import { addTask } from "../../utils/addTask";
import useAutoHideFeedback from "../../hooks/useAutoHideFeedback";
import Alert from "../UI/Alert";
import useTasksStore from "../../store/useTasksStore";
import { Modal } from "@mui/material";

export default function AddTask({}) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDifficulty, setTaskDifficulty] = useState(null);
  const fetchTasks = useTasksStore((state) => state.fetchTasks);
  const showAddTaskModal = useTasksStore((state) => state.showAddTaskModal);
  const closeAddTaskModal = useTasksStore((state) => state.closeAddTaskModal);
  const taskStateInModal = useTasksStore((state) => state.taskStateInModal);

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
      await addTask({
        title: taskTitle,
        difficulty: taskDifficulty,
        state: taskStateInModal,
      });
      await fetchTasks(); // fetch from server and set to state to re render
      closeAddTaskModal();
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
    <Modal
      open={showAddTaskModal}
      onClose={closeAddTaskModal}
      style={{ position: "absolute", top: "10vh" }}
    >
      <div className="flex flex-col w-10/12 md:w-7/12 lg:w-5/12 xl:w-3/12 p-4 rounded-xl gap-4 mx-auto my-2 outline-none bg-gray-2">
        <Input
          placeholder="Add a task"
          onChangeInputSetter={setTaskTitle}
          customClass="md:py-4"
        />
        <div className="flex items-center justify-between">
          <Select onChangeInputSetter={setTaskDifficulty} />
          <Plus
            color="#ffffff"
            size={"50px"}
            className="hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer"
            onClick={addTaskBtnHandler}
          />
        </div>
      </div>
      {/* {autoHideFeedback && (
        <Alert
          type={autoHideFeedback.type}
          message={autoHideFeedback.message}
        />
      )} */}
    </Modal>
  );
}
