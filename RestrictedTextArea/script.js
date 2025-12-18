let textarea = document.querySelector("textarea");
let errorElm = document.querySelector(".error");
let charCount = document.querySelector(".charCount");
document.addEventListener("input", () => {
  let charVal = textarea.value;
  console.log(charVal);
  let length = charVal.length;
  console.log(length);
  charCount.textContent = length;
  if (length == 250) {
    console.log("Limit Reached.");
    errorElm.style.display = "block";
    textarea.style.color = "red";
    textarea.style.borderColor = "red";
  } else {
    textarea.style.color = "black";
    textarea.style.borderColor = "black";
    errorElm.style.display = "none";
  }
});
