//This is from Data first Approach

let taskArr = [];
let taskEnterElm = document.querySelector(".enter");
taskEnterElm.addEventListener("click", enterElm);

function enterElm() {
  const taskElm = document.querySelector("#task");
  const userInput = taskElm.value.trim();
  if (userInput === "") {
    showError();
    return;
  }
  addTask(userInput);
  taskElm.value = "";
}
function addTask(description) {
  let taskObj = {
    id: Date.now(),
    description: description,
    completed: false,
  };
  taskArr.push(taskObj);
  renderTasks();
}

function renderTasks() {
  const taskList = document.querySelector(".task-list");
  const template = document.querySelector(".task-template");

  taskList.innerHTML = "";

  taskArr.forEach((task) => {
    const clone = template.content.cloneNode(true);
    const liElm = clone.querySelector(".list");
    const taskText = clone.querySelector(".task-text");
    const emptyBox = clone.querySelector(".empty-box");
    const markedBox = clone.querySelector(".marked-box");
    const toggles = clone.querySelectorAll(".toggle");
    const deleteBox = clone.querySelector(".delete");
    taskText.textContent = task.description;

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => toggleTask(task.id));
    });
    if (task.completed) {
      taskText.classList.add("strike");
      emptyBox.classList.add("hide-icon");
      markedBox.classList.remove("hide-icon");
    }
    deleteBox.addEventListener("click", () => {
      deleteTask(task.id);
    });
    taskList.appendChild(clone);
    console.log(taskArr);
  });
  taskInfo();
}

function toggleTask(id) {
  const task = taskArr.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
  }
  console.log(taskArr);
  renderTasks();
}

function deleteTask(id) {
  taskArr = taskArr.filter((t) => t.id !== id);
  renderTasks();
}

function taskInfo() {
  const taskNum = document.querySelector(".task-num");
  const completedTaskNum = document.querySelector(".completed-num");
  taskNum.textContent = taskArr.length;
  completedTaskNum.textContent = taskArr.filter((t) => t.completed).length;
}
