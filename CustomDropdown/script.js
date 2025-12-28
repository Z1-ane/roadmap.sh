const qnElm = document.querySelector(".qn");
let textElm = document.querySelector(".text");
const optDiv = document.querySelector(".options");
const optElm = document.querySelectorAll(".options > div");
// console.log(qnElm);

qnElm.addEventListener("click", () => {
  optDiv.classList.toggle("showOptions");
});

optElm.forEach((opt) => {
  opt.addEventListener("click", () => {
    document.querySelectorAll(".tick").forEach((t) => {
      t.remove();
    });
    optDiv.classList.add("showOptions");
    textElm.textContent = `${opt.textContent}`;

    // opt.innerHTML += `<span> <i class="fa-solid fa-square-check"></i> </span>`;
    const tick = document.createElement("span");
    tick.className = "tick";
    tick.innerHTML = `<i class="fa-solid fa-square-check">`;
    opt.appendChild(tick);
  });
});
