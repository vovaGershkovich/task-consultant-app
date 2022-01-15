// get function
function get() {
    let req = new XMLHttpRequest();
    req.open("GET", "http://localhost:3000/tasks");
  
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        let array = JSON.parse(req.response);
        let res = "";
        res =
          res +
          `<th class="table-secondary" style="font-size: 25px;">Task Number</th> <th class="table-primary" style="font-size: 25px">Task Name</th> <th class="table-warning" style="font-size: 25px">Description</th> <th class="table-info" style="font-size: 25px">Start time</th> <th class="table-danger" style="font-size: 25px">Start date</th> <th class="table-light" style="font-size: 25px">Delete Task</th> <th class="table-dark" style="font-size: 25px">Edit start date</th>`;
  
        for (const task of array) {
          res =
            res +
            `<tr class="table-primary">
              <td class="table-secondary"><strong>${task.taskNumber}</strong></td>
              <td class="table-primary"><strong>${task.taskName}</strong></td>
              <td class="table-warning"><strong>${task.description}</strong></td>
              <td class="table-info"><strong>${task.priority}</strong></td>
              <td class="table-danger"><strong>${task.finishDate}</strong></td>
              <td class="table-light"><button onclick="deleteTask('${String(
                task.taskName
              )}')" class="btn btn-danger" style="color: black"><strong>Delete Task</strong></button></td>
              <td class="table-dark"><button onclick="put('${
                task.taskName
              }')" class="btn btn-light"><strong>Edit date</strong></button></td>
            </tr>`;
        }
        document.getElementById("table").innerHTML = res;
      }
    };
    req.send();
  }
  
  // post function
  function post() {
    let tNumber = document.getElementById("tNumber").value;
    let tName = document.getElementById("tName").value;
    let tDescription = document.getElementById("tDescription").value;
    let tPriority = document.getElementById("tPriority").value;
    let tDate = document.getElementById("tDate").value;
  
    // validations
    if (tNumber < 0 || tNumber == null) {
      alert("Enter a task number!");
      return;
    }
  
    if (!tName) {
      alert("Enter a name!");
      return;
    }
  
    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:3000/tasks/add");
  
    req.onreadystatechange = () => {
      if (req.readyState === 4) get();
    };
  
    req.setRequestHeader("Content-type", "application/json");
  
    req.send(
      JSON.stringify({
        taskNumber: tNumber,
        taskName: tName,
        description: tDescription,
        priority: tPriority,
        finishDate: tDate,
      })
    );
  }
  
  // Delete function
  function deleteTask(taskName) {
    let req = new XMLHttpRequest();
    req.open("DELETE", `http://localhost:3000/tasks/delete/${taskName}`);
  
    req.onreadystatechange = () => {
      if (req.readyState === 4) get();
    };
    req.send();
  }
  
  // put function
  function put(param) {
    let req = new XMLHttpRequest();
    let taskName = prompt("Edit Date, Local time is - " + new Date());
  
    req.open("PUT", `http://localhost:3000/tasks/update/${param}`);
    req.onreadystatechange = () => {
      if (req.readyState === 4) get();
    };
    req.setRequestHeader("Content-Type", "application/json");
  
    req.send(JSON.stringify({ newName: taskName }));
  }
  