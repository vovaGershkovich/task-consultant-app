const mongoose = require("mongoose");

let TaskSchema = new mongoose.Schema(
  {
    taskNumber: Number,
    taskName: String,
    description: String,
    priority: String,
    finishDate: String,
  },
  {
    strict: false,
  }
);

const TaskModel = mongoose.model("tasks-app", TaskSchema);
module.exports = TaskModel;
