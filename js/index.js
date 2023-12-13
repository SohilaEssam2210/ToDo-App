// [1] Find Element
let theInput = document.querySelector(".add-task input");
let addBtn = document.querySelector(".add-task span.plus");
let taskContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let deleteAll = document.querySelector(".del-btn");
let finishAll = document.querySelector(".finish-btn");

// [2] Focus On Input Field
window.onload = function () {
  theInput.focus();
};

// ![3] adding the tasks

addBtn.onclick = function () {
  // if input is Emty
  if (theInput.value === "") {
    // Sweet alert
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Must not be Emty!",
    });
  } else {
    const taskName = theInput.value;
    const taskExists = Array.from(taskContainer.children).some((task) => {
      const taskText = task.firstChild.textContent;
      return taskText === taskName;
    });
    if (taskExists) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Task already exists!",
      });
    } else {
      let noTasksMsg = document.querySelector(".no-tasks-message");

      //Check if span wiht No tasks mesage is Exist
      if (document.body.contains(document.querySelector(".no-tasks-message"))) {
        //remove no task span
        noTasksMsg.remove();
      }

      // create main span
      let mainSpan = document.createElement("span");
      //create delete span
      let deletespn = document.createElement("span");

      // create text main span
      let textmain = document.createTextNode(theInput.value);
      //create delete text span
      let deletetxt = document.createTextNode("Delete");

      //append text to main span
      mainSpan.appendChild(textmain);
      //create class to main span
      mainSpan.className = "task-box";

      //append text to delete span
      deletespn.appendChild(deletetxt);
      //create class to delete span
      deletespn.className = "delete";

      // append delete span in main span
      mainSpan.appendChild(deletespn);

      //!add the task to container
      taskContainer.appendChild(mainSpan);

      // emty the input
      theInput.value = "";
      //focus input
      theInput.focus();
      //calcolate tasks
      calcolateTask(); 
    }
  }
};

document.addEventListener("click", function (e) {
  //Delete task
  if (e.target.className == "delete") {
    e.target.parentNode.remove();
    theInput.focus();
    // check number of tasks inside the container
    if (taskContainer.childElementCount == 0) {
      createNoTask();
    }
  }
  //Finish task
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
  }
  //calcolate tasks
  calcolateTask();
});

// Function to delete all tasks
deleteAll.onclick = function () {
  Swal.fire({
    title: "Are you sure?",
    text: "This will delete all tasks!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete all!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Remove all tasks from the taskContainer
      taskContainer.innerHTML = "";
      // Display a message (you can customize this part)
      Swal.fire("Deleted!", "All tasks have been deleted.", "success");
    }
    createNoTask();
  });
};
// Function to Finished all tasks
finishAll.onclick = function () {
  Swal.fire({
    title: "Are you sure?",
    text: "This will finish all tasks!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, finish all!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Add a class to mark all tasks as finished
      const tasks = document.querySelectorAll(".task-box");
      tasks.forEach((task) => {
        task.classList.add("finished");
      });
      // Display a message (you can customize this part)
      Swal.fire("Finished!", "All tasks have been finished.", "success");
    }
  });
};

//? create function no tasks to show
function createNoTask() {
  //create msg span
  let msgSpan = document.createElement("span");
  //create text msg span
  let msgText = document.createTextNode("No Tasks To Show");
  //append text to span
  msgSpan.appendChild(msgText);
  //add class to span
  msgSpan.className = "no-tasks-message";
  //append to task container
  taskContainer.appendChild(msgSpan);
}

//calcolate tasks
function calcolateTask() {
  //calcolate all tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  //calcolate completed tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}
