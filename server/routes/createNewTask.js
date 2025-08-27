const { z } = require("zod");
const Task = require("../models/TaskSchema");

const createNewTask = async (req, res) => {
  try {
    // get the req body (task)
    const taskTitle = req.body?.title;
    const taskDescription = req.body?.description;
    const taskState = req.body?.state;
    const taskDifficulty = req.body?.difficulty;

    // validate the task body
    const ValidTask = z.object({
      title: z.string().min(3).max(50),
      description: z.string().min(3).max(10000),
      state: z.enum(["todo", "progress", "review", "finished"]),
      difficulty: z.enum(["easy", "medium", "hard"]),
    });

    const taskInputValidationResult = ValidTask.safeParse({
      title: taskTitle,
      description: taskDescription,
      state: taskState,
      difficulty: taskDifficulty,
    });

    // if task input validation not successful
    if (!taskInputValidationResult.success) {
      return res
        .status(400)
        .json({ message: taskInputValidationResult.error.issues });
    }

    // associate the task with correct user
    const userId = req.headers.user.id; // getting from the middleware
    console.log(userId);

    // create a new task in the db
    const newTask = new Task({
      title: taskTitle,
      description: taskDescription,
      state: taskState,
      difficulty: taskDifficulty,
      userId,
    });

    await newTask.save();

    res.status(200).json({ message: "Task created" });
    // console.log(taskState)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "ERROR occurred" });
  }
};

module.exports = createNewTask;
