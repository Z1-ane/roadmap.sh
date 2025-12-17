let liElms = document.querySelectorAll("li");
let contentBox = document.querySelector(".content-box");
let firstBox = document.querySelector(".first");
let secondBox = document.querySelector(".second");
let thirdBox = document.querySelector(".third");
let fourthBox = document.querySelector(".fourth");
console.log(liElms);

// for (let liElm of liElms) {
//   liElm.addEventListener("click", () => {
//     console.log("Hello");
//     contentBox.style.display = "none";
//   });
// }

document.addEventListener("DOMContentLoaded", () => {
  secondBox.style.display = "none";
  thirdBox.style.display = "none";
  fourthBox.style.display = "none";
});

liElms.forEach((li, index) => {
  li.addEventListener("click", () => {
    if (index === 0) {
      console.log("First Tab");
      firstBox.style.display = "block";
      secondBox.style.display = "none";
      thirdBox.style.display = "none";
      fourthBox.style.display = "none";
    }
    if (index === 1) {
      console.log("Second Tab");
      firstBox.style.display = "none";
      thirdBox.style.display = "none";
      fourthBox.style.display = "none";
      secondBox.style.display = "block";
    }
    if (index === 2) {
      console.log("Third Tab");
      secondBox.style.display = "none";
      firstBox.style.display = "none";
      fourthBox.style.display = "none";
      thirdBox.style.display = "block";
    }

    if (index === 3) {
      console.log("Fourth Tab");
      secondBox.style.display = "none";
      thirdBox.style.display = "none";
      firstBox.style.display = "none";
      fourthBox.style.display = "block";
    }
  });
});
