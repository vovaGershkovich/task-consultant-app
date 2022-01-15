// imports
const express = require("express");
const mongoose = require("mongoose");
const tasks = require("./routes/TasksRoute");

const app = express();
const port = 3000;

app.use(express.static("./public")); // use static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/tasks", tasks);

// connect to mongoDB
mongoose.connect("mongodb://localhost:27017/Tasks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => console.log(`Server is up on port '${port}'`));
