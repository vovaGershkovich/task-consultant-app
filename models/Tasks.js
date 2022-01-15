// imports
const mongoose = require("mongoose");

// objects schema
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

const TaskModel = mongoose.model("tasks-app", TaskSchema); // create "tasks-app" collection
module.exports = TaskModel; // export the file
