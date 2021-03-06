const Task = require("../model/task.model");
const Project = require("../model/project.model");

exports.get = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });

    res.status(200).json({
      message: "List Task",
      tasks: tasks,
    });
  } catch (error) {
    return res.status(400).send({ error: "Error loading tasks" });
  }
};

exports.post = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.userId });

    //update in Project
    Project.findOneAndUpdate({ id: req.body.project, tasks: [task] });

    return res.status(201).json({
      message: "Create Task",
      task: task,
    });
  } catch (error) {
    return res.status(400).send({ error: "Error create task" });
  }
};

exports.getById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    res.status(200).json({
      message: "Id Tasks",
      tasks: task,
    });
  } catch (error) {
    return res.status(400).send({ error: "Error loading tasks" });
  }
};

exports.patch = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(201).json({
      message: "Update Task",
      taskId: task._id,
    });
  } catch (error) {
    return res.status(400).send({ error: "Error update task" });
  }
};

exports.delete = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) res.status(404).send("Task not found");

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    return res.status(400).send({ error: "Error delete task" });
  }
};
