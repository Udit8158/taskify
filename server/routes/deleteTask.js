const Task = require("../models/TaskSchema");

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params?.id;

    if (!taskId) {
      res.status(400).json({ message: "Need a task id" });
    }

    // find the task in the db
    const task = await Task.findOne({ _id: taskId });

    if (!task) {
      return res.status(400).json({ message: "Wrong task id provided" });
    }

    // check the user has the access to delete the task or not
    // (I think it's optional as we will only show the task of that user)

    if (task?.userId == req.headers?.user.id) {
      await Task.deleteOne({ _id: taskId });
      return res.status(200).json({ message: "Deleted successfully" });
    } else {
      return res
        .status(401)
        .json({ message: "You don't have permission to delete this" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = deleteTask;
