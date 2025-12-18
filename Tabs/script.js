let liElms = document.querySelectorAll("li");
let contentBox = document.querySelector(".content-box");
const boxes = document.querySelectorAll(".content-box>div");
console.log(boxes);
console.log(liElms);

// for (let liElm of liElms) {
//   liElm.addEventListener("click", () => {
//     console.log("Hello");
//     contentBox.style.display = "none";
//   });
// }

boxes.forEach((box, index) => {
  if (index === 0) {
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
});

liElms.forEach((li, index) => {
  li.addEventListener("click", () => {
    boxes.forEach((box, i) => {
      if (index === i) {
        box.style.display = "block";
      } else {
        box.style.display = "none";
      }
    });
  });
});
