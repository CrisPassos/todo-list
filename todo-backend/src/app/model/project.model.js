const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const project = new Schema({
  projectName: { type: String, unique: true, required: true },
  createdDate: { type: Date, default: Date.now, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

project.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Project", project);
