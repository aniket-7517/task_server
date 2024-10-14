const taskmodel = require("../model/task");
const Task = require("../model/task");

const taskCtrl = {
  // Fetch all tasks for a user
  getTasks: async (req, res) => {
    try {
      const tasks = await taskmodel.find({ userId: req.user.id }); // Filter by userId
      res.json({ status: "success", data: tasks });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Fetch a single task by ID and user ID
  getTask: async (req, res) => {
    try {
      const task = await taskmodel.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json({ status: "success", data: task });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Create a new task
  createTask: async (req, res) => {
    try {
      const newTask = new taskmodel({ ...req.body, userId: req.user.id });
      await newTask.save();
      res
        .status(201)
        .json({
          status: "success",
          message: "Task created successfully",
          data: newTask,
        });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Invalid task data" });
    }
  },

  // Update a task by ID and user ID
  updateTask: async (req, res) => {
    try {
      const task = await taskmodel.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true }
      );
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json({
        status: "success",
        message: "Task updated successfully",
        data: task,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Delete a task by ID and user ID
  deleteTask: async (req, res) => {
    try {
      const task = await taskmodel.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json({ status: "success", message: "Task deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = taskCtrl;
