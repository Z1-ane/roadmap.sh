let btns = document.querySelectorAll("button");
let containerElm = document.querySelector(".container");

const value = localStorage.getItem("cookieConsent");
if (value == "accepted") {
  hide();
  newDiv();
}
btns.forEach((btn) => {
  console.log(btn);
  btn.addEventListener("click", () => {
    if (btn.classList.contains("agree")) {
      console.log("The user gave permission to use cookies");
      hide();
      newDiv();
      localStorage.setItem("cookieConsent", "accepted");
    } else if (btn.classList.contains("decline")) {
      console.log("The user denied");
    } else {
      console.log("This feature is  being developed.");
    }
  });
});

function hide() {
  containerElm.style.display = "none";
}

function newDiv() {
  let newDiv = document.createElement("div");
  let para = document.createElement("p");
  let resetBtn = document.createElement("button");
  document.body.appendChild(newDiv);
  newDiv.appendChild(para);
  newDiv.appendChild(resetBtn);
  resetBtn.innerText = "Reset";
  para.innerText =
    "The cookie form is not being displayed because in localstorage cookie access is saved. To clear the local storage click reset";
  resetBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
}
