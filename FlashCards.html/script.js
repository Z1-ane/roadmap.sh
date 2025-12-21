let qnArr = [
  {
    id: 1,
    qn: "What is a closure in JavaScript?",
    ans: "A closure allows a function to access variables from its outer scope even after that scope has closed.",
  },
  {
    id: 2,
    qn: "Explain the difference between let, var, and const.",
    ans: "var is function-scoped; let and const are block-scoped; const cannot be reassigned.",
  },
  {
    id: 3,
    qn: "What is hoisting?",
    ans: "JavaScript moves declarations to the top of their scope during compilation.",
  },
  {
    id: 4,
    qn: "What is the event loop?",
    ans: "A mechanism that handles asynchronous callbacks in JavaScript.",
  },
  {
    id: 5,
    qn: "Define a Promise.",
    ans: "A Promise represents the eventual completion or failure of an asynchronous operation.",
  },
  {
    id: 6,
    qn: "What is async/await used for?",
    ans: "To write asynchronous code that looks synchronous.",
  },
  {
    id: 7,
    qn: "Explain event bubbling.",
    ans: "Events propagate from the target element up through its ancestors.",
  },
  {
    id: 8,
    qn: "What is the DOM?",
    ans: "The Document Object Model representing HTML as a tree structure.",
  },
  {
    id: 9,
    qn: "What is a callback function?",
    ans: "A function passed into another to be executed later.",
  },
  {
    id: 10,
    qn: "Explain arrow functions.",
    ans: "A shorter function syntax that does not bind its own 'this'.",
  },
  {
    id: 11,
    qn: "What is the difference between == and ===?",
    ans: "=== checks strict equality; == performs type coercion.",
  },
  {
    id: 12,
    qn: "What is an IIFE?",
    ans: "Immediately Invoked Function Expression—executes immediately after creation.",
  },
  {
    id: 13,
    qn: "Define higher-order functions.",
    ans: "Functions that take other functions as arguments or return them.",
  },
  {
    id: 14,
    qn: "What is the spread operator?",
    ans: "Syntax (...) used to expand iterable elements.",
  },
  {
    id: 15,
    qn: "What is a template literal?",
    ans: "A string that supports embedded expressions using backticks.",
  },
  {
    id: 16,
    qn: "What is destructuring?",
    ans: "Extracting values from arrays or objects into variables.",
  },
  {
    id: 17,
    qn: "What is localStorage?",
    ans: "Browser storage that persists data with no expiration.",
  },
  {
    id: 18,
    qn: "What is a module in JavaScript?",
    ans: "A reusable chunk of code imported/exported between files.",
  },
  {
    id: 19,
    qn: "What is CORS?",
    ans: "Cross-Origin Resource Sharing—controls requests between different domains.",
  },
  {
    id: 20,
    qn: "What is debounce?",
    ans: "A technique to delay execution until after a function stops being called.",
  },
];

let buttons = document.querySelectorAll("button");
console.log(buttons);
let count = 0;
let state = true;
buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index == 0) {
      try {
        count--;
        if (count < 0) {
          count = 0;
          throw new Error("This is the first qn");
        } else {
          displayqn(count);
          qnCount(count);
          percentCount(count);
          resetCardState();
        }
      } catch (error) {
        console.log(error);
      }
    } else if (index == 1) {
      if (state) {
        displayAns(count);
        let qnElm = document.querySelector(".qnElm");
        qnElm.classList.toggle("qn_hide");
        let ansElm = document.querySelector(".answer");
        ansElm.classList.toggle("ans_hide");
        btn.textContent = "Hide Answer";
        state = false;
      } else {
        btn.textContent = "Show Answer";
        state = true;
        displayqn(count);
        let ansElm = document.querySelector(".answer");
        ansElm.classList.toggle("ans_hide");
        let qnElm = document.querySelector(".qnElm");
        qnElm.classList.toggle("qn_hide");
      }
    } else {
      try {
        count++;
        if (count > 19) {
          count = 19;
          throw new Error("End of a qn.");
        } else {
          displayqn(count);
          displayqn(count);
          qnCount(count);
          percentCount(count);
          resetCardState();
        }
      } catch (err) {
        console.log(err);
      }
    }
  });
});

function displayqn(count) {
  let qnElm = document.querySelector(".qnElm");
  qnElm.innerText = qnArr[count].qn;
}

function displayAns(count) {
  let ansElm = document.querySelector(".answer");
  ansElm.textContent = qnArr[count].ans;
}

function qnCount(count) {
  let qnNumber = document.querySelector(".number");
  qnNumber.textContent = count + 1;
}

function percentCount(count) {
  let percentNum = document.querySelector(".num");
  let progressBar = document.querySelector(".progress_bar");
  let val = Math.floor(((count + 1) / 20) * 100);
  percentNum.textContent = `${val} %`;
  progressBar.style.width = `${val}%`;
}

function resetCardState() {
  state = true;
  buttons[1].textContent = "Show Answer";
  let qnElm = document.querySelector(".qnElm");
  let ansElm = document.querySelector(".answer");
  qnElm.classList.remove("qn_hide");
  ansElm.classList.add("ans_hide");
}

displayqn(count);
qnCount(count);
percentCount(count);
displayqn(count);
