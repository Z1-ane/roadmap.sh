import { DateTime } from "../node_modules/luxon/build/es6/luxon.mjs";
import "../node_modules/flatpickr/dist/flatpickr.js";

let buttonElm = document.querySelector(".calculate");
let dateElm = document.querySelector("#birthdate");
flatpickr("#birthdate", {
  dateFormat: "Y-m-d",
});

buttonElm.addEventListener("click", () => {
  let dateVal = dateElm.value;
  let birthDate = DateTime.fromISO(dateVal);
  const currentDate = DateTime.now();
  let age = DateTime.fromISO(currentDate)
    .diff(birthDate, ["years", "months", "days"])
    .toObject();
  try {
    if (age["days"] < 0) {
      let msg = "Oops you are not born yet.";
      displayError(msg);
      throw new Error(msg);
    }
    displayAge(age["years"]);
  } catch (err) {
    console.log(err.message);
  }
});

function displayAge(yrs) {
  let pElm = document.querySelector("p");
  pElm.innerHTML = "";
  let spanElm = document.createElement("span");

  pElm.append(spanElm);
  spanElm.innerText = `You are ${yrs} years old.`;
}
function displayError(msg) {
  let pElm = document.querySelector("p");
  pElm.innerHTML = "";
  let spanElm = document.createElement("span");
  pElm.append(spanElm);
  spanElm.innerText = msg;
}
