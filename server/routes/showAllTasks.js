const Task = require("../models/TaskSchema");

const showAllTasks = async (req, res) => {
  try {
    const userId = req.headers.user?.id;

    // find the tasks for the user
    const tasks = await Task.find({ userId });
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ message: "ERROR Occurred" });
  }
};

module.exports = showAllTasks;
