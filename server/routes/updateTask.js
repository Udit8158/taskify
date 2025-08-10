const { z } = require("zod");
const Task = require("../models/TaskSchema");

const updateTaskRoute = async (req, res) => {
  try {
    // first find the task with the id

    const taskId = req.params.id;
    const foundTask = await Task.findOne({ _id: taskId });
    console.log(foundTask);

    if (!foundTask) {
      return res.status(404).json({ message: "No task found" });
    }
    // get body of req
    // we can write to update the whole task or only category
    // so we need to make it robust
    console.log(req.body);

    if (req.body) {
      const { title, description, state, difficulty } = req.body;

      // validated the task body
      const ValidTask = z.object({
        title: z.string().min(3).max(30),
        description: z.string().min(3).max(50),
        state: z.enum(["todo", "progress", "review", "finished"]),
        difficulty: z.enum(["easy", "medium", "hard"]),
      });

      const taskInputValidationResult = ValidTask.safeParse({
        title,
        description,
        state,
        difficulty,
      });

      if (!taskInputValidationResult.success) {
        return res
          .status(400)
          .json({ message: taskInputValidationResult.error.issues });
      }

      // check if the user have the access of task or not first then update the task
      // I think it's pretty optional as I am already checking user is authenticated
      // and an authenticated user can only see their tasks in the frontend

      const userId = req.headers.user?.id;
      if (foundTask?.userId == userId) {
        console.log(typeof foundTask);
        console.log(taskInputValidationResult);
        // update the task
        await Task.updateOne({ _id: taskId }, taskInputValidationResult.data);
        res.status(200).json({message: "Updated successfully"})
      } else {
        return res.status(401).json({ message: "You're not allowed to do." });
      }
    } else {
      return res.status(400).json({ message: "Body is null" });
    }
  } catch (error) {
    console.log("------------ ERROR -----------------", error);
    return res.status(500).json({ message: error });
  }
};

module.exports = updateTaskRoute;
