//The DOM Way

let taskEnterElm = document.querySelector(".enter");
console.log(taskEnterElm);
taskEnterElm.addEventListener("click", clickEnter);

function clickEnter() {
  let state = true;
  let taskElm = document.querySelector("#task");
  let taskVal = taskElm.value;
  const taskList = document.querySelector(".task-list");
  if (taskVal == "") return alert("Task Node Cannot be empty");
  const template = document.querySelector(".task-template");
  const clone = template.content.cloneNode(true);
  const liElm = clone.querySelector("li");
  const taskText = clone.querySelector(".text");
  taskText.textContent = taskVal;
  taskElm.value = "";
  const emptyBox = clone.querySelector(".empty-box");
  const markedBox = clone.querySelector(".marked-box");
  const deleteBox = clone.querySelector(".delete");
  emptyBox.addEventListener("click", () => {
    taskText.classList.toggle("strike");
    emptyBox.classList.toggle("hide-icon");
    markedBox.classList.toggle("hide-icon");
  });
  markedBox.addEventListener("click", () => {
    taskText.classList.toggle("strike");
    emptyBox.classList.toggle("hide-icon");
    markedBox.classList.toggle("hide-icon");
  });
  deleteBox.addEventListener("click", () => {
    liElm.remove();
  });
  taskList.appendChild(clone);
}
