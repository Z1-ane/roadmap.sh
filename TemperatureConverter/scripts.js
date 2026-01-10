const fromBtn = document.querySelector(".from-unit");
const firstChildrenBtn = document.querySelectorAll(".unit-lists1 button");
const secondChildrenBtn = document.querySelectorAll(".unit-lists2 button");

let fromVal = "";
let toVal = "";

const convertBtn = document.querySelector(".convert-btn");
fromBtn.addEventListener("click", () => {
  document.querySelector(".unit-lists1").classList.toggle("show");
});
const toBtn = document.querySelector(".to-unit");
toBtn.addEventListener("click", () => {
  document.querySelector(".unit-lists2").classList.toggle("show");
});

firstChildrenBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    fromVal = btn.textContent;
    document.querySelector(".from-text").textContent = fromVal;
    document.querySelector(".unit-lists1").classList.toggle("show");
  });
});

secondChildrenBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    toVal = btn.textContent;
    document.querySelector(".to-text").textContent = toVal;
    document.querySelector(".unit-lists2").classList.toggle("show");
  });
});

convertBtn.addEventListener("click", () => {
  const userVal = document.querySelector("#temperature").value;
  if (fromVal != "" && toVal != "" && userVal != "") {
    const result = convertTemp(fromVal, toVal).toFixed(2);
    if (isNaN(result)) {
      document.querySelector(".result").textContent =
        "Please enter a valid number!";
      document.querySelector(".result").style.color = "red";
      return;
    }
    document.querySelector(
      ".result"
    ).textContent = `${userVal} ${fromVal} is ${result} ${toVal}`;
    document.querySelector(".result").style.color = "green";
  }
});

function convertTemp(inputTemp, outputTemp) {
  const userVal = Number(document.querySelector("#temperature").value);

  if (inputTemp === "Fahrenheit" && outputTemp === "Celsius") {
    return ((userVal - 32) * 5) / 9;
  } else if (inputTemp === "Fahrenheit" && outputTemp === "Kelvin") {
    return ((userVal - 32) * 5) / 9 + 273.15;
  } else if (inputTemp === "Celsius" && outputTemp === "Fahrenheit") {
    return (userVal * 9) / 5 + 32;
  } else if (inputTemp === "Celsius" && outputTemp === "Kelvin") {
    return userVal + 273.15;
  } else if (inputTemp === "Kelvin" && outputTemp === "Fahrenheit") {
    return ((userVal - 273.15) * 9) / 5 + 32;
  } else if (inputTemp === "Kelvin" && outputTemp === "Celsius") {
    return userVal - 273.15;
  } else {
    return userVal;
  }
}
