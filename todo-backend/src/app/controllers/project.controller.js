const Project = require("../model/project.model");
const Task = require("../model/task.model");

exports.get = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId }).populate("tasks");

    res.status(200).json({
      message: "List Project",
      projects: projects,
    });
  } catch (error) {
    return res.status(400).send({ error: "Error loading projects" });
  }
};

exports.post = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, user: req.userId });

    return res.status(201).json({
      message: "Create Project",
      project: project,
    });
  } catch (error) {
    return res.status(400).send({ error: "Error creating new project" });
  }
};

exports.getById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("tasks");

    res.status(200).json({
      message: "Id Project",
      projects: project,
    });
  } catch (error) {
    return res.status(400).send({ error: "Error loading project" });
  }
};

exports.patch = async (req, res) => {
  try {
    //new true retorna o projeto atualizado
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(201).json({
      message: "Update Project",
      projectId: project._id,
    });
  } catch (error) {
    return res.status(400).send({ error: "Error update  project" });
  }
};

exports.delete = async (req, res) => {
  try {
    await Project.findAndDelete({ user: req.userId, id: req.params.id });

    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    return res.status(400).send({ error: "Error remove project" });
  }
};
