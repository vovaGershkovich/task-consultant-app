// imports
const express = require("express");
const Task = require("../models/Tasks");

// define router
const router = express.Router();

// CRUD:
// get (read) request
router.get("/", (req, res) => {
  Task.find({}).exec((error, tasks) => {
    if (error) {
      console.log(error.message);
    } else {
      res.json(tasks);
    }
  });
});

// post (create) request
router.post("/add", (req, res) => {
  let newTask = new Task();
  (newTask.taskNumber = req.body.taskNumber),
    (newTask.taskName = req.body.taskName),
    (newTask.description = req.body.description),
    (newTask.priority = req.body.priority),
    (newTask.finishDate = req.body.finishDate),
    newTask.save((error, task) => {
      if (error) {
        res.status(404); // 404 code - not fount
      } else {
        res.status(201); // 201 code - created
        res.send("New task was created!");
      }
    });
});

// put (update) request
router.put("/update/:name", (req, res) => {
  Task.findOneAndUpdate(
    { name: req.params.taskName },
    { $set: { finishDate: req.body.newDate } },
    (error, task) => {
      if (error || task === undefined) {
        res.status(404);
        res.send("Unable update the task!");
      } else {
        res.status(200);
        res.send("Task's date updated!");
      }
    }
  );
});

// delete request
router.delete("/delete/:name", (req, res) => {
  Task.findOneAndDelete({ name: req.params.taskName }).exec((error, task) => {
    if (error || task === undefined) {
      res.status(404);
      res.send("Unable to delete the task!");
    } else {
      res.status(200);
      res.send("Deleted successfully");
    }
  });
});

// export the file
module.exports = router;
