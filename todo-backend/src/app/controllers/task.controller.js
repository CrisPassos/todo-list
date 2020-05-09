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

  // Task.find().then(documents => {
  //   res.status(200).json({
  //     message: "List Tasks",
  //     response: documents,
  //   });
  // });
};

exports.post = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.userId });

    //update in Project
    Project.findOneAndUpdate({ id: req.body.project, tasks: [task] });

    return res.status(201).json({
      message: "Create Task",
      project: task,
    });
  } catch (error) {
    return res.status(400).send({ error: "Error create task" });
  }

  // const task = new Task({
  //   task: req.body.task,
  //   status: req.body.status,
  //   project: req.body.project,
  // });

  // task.save().then(created => {
  //   res.status(201).json({
  //     message: "Create Task",
  //     response: created._id,
  //   });
  // });
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
  // try {
  //   const task = Task.findByIdAndUpdate(req.params.id, req.body);
  //   Task.save();
  //   res.status(201).json({
  //     message: "Update added successfully",
  //     response: task,
  //   });
  // } catch (err) {
  //   res.status(500).send(err);
  // }
};

exports.delete = async (req, res) => {
  try {
    await Task.findAndDelete({ user: req.userId, id: req.params.id });

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    return res.status(400).send({ error: "Error delete task" });
  }
  // try {
  //   const task = Task.findByIdAndDelete(req.params.id);
  //   if (!task) res.status(404).send("Task not found");
  //   res.send(200).json({ message: "Project deleted" });
  // } catch (err) {
  //   res.status(500).send(err);
  // }
};
