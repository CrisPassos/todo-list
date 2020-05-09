const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const task = new Schema({
  task: { type: String, required: true },
  done: { type: Boolean, default: false, required: true },
  createdDate: { type: Date, default: Date.now, required: true },
  finishDate: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    require: true,
  },
});

task.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Task", task);
