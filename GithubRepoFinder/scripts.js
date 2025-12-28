let qnBar = document.querySelector(".qn");
const optionBox = document.querySelector(".option-box");
const optionList = document.querySelector(".option-list");
const initialState = document.querySelector(".idle-state");
const fetchState = document.querySelector(".fetch-state");
const sucessState = document.querySelector(".sucess-state");
const rejectState = document.querySelector(".reject-state");
const buttonElm = document.querySelector("button");
let currentLanguage = "";
qnBar.addEventListener("click", () => {
  fetchOptions();
});

async function fetchOptions() {
  const url =
    "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json";

  const response = await fetch(url);
  const data = await response.json();
  if (optionList.children.length > 1) {
    optionBox.classList.toggle("show-box");
    return;
  }
  data.forEach((lang) => {
    const template = document.querySelector(".option-list-container");
    const clone = template.content.cloneNode(true);
    const optElm = clone.querySelector(".option-elm");
    optElm.textContent = lang.title;
    optElm.addEventListener("click", (e) => {
      e.stopPropagation();
      qnBar.textContent = lang.title;
      currentLanguage = lang.title;
      optionBox.classList.toggle("show-box");
      fetchResult(currentLanguage);
    });
    optionList.appendChild(optElm);
  });
}

async function fetchResult(query) {
  initialState.style.display = "none";
  sucessState.style.display = "none";
  rejectState.style.display = "none";
  fetchState.style.display = "block";
  const url = `https://api.github.com/search/repositories?q=language:${query}&sort=stars&order=desc`;

  try {
    const response = await fetch(url);
    if (response.status === 403) {
      showError("Slow down! GitHub limit reached. Wait 60 seconds.");
      return;
    }

    if (!response.ok) {
      throw new Error("Could not fetch API");
    }
    const data = await response.json();
    if (data.items.length === 0) {
      showError("No repositories found.");
      return;
    }
    showResult(data.items);
  } catch (err) {
    buttonElm.textContent = "Click to Retry";
    buttonElm.style.backgroundColor = "red";
    showError(err.message);
  }
}

function showResult(repo) {
  const repoName = document.querySelector(".repo-name");
  const repoDescription = document.querySelector(".repo-description");
  const languageName = document.querySelector(".language");
  const starCount = document.querySelector(".star-count");
  const forkCount = document.querySelector(".fork-count");
  const infoCount = document.querySelector(".info-count");

  const randomNum = Math.floor(Math.random() * repo.length);

  const {
    name,
    description,
    forks_count,
    stargazers_count,
    language,
    open_issues_count,
  } = repo[randomNum];

  sucessState.style.display = "block";
  fetchState.style.display = "none";
  repoName.textContent = name;
  repoDescription.textContent = description || "No descriptions available.";
  languageName.textContent = language;
  starCount.textContent = stargazers_count;
  forkCount.textContent = forks_count;
  infoCount.textContent = open_issues_count;
  buttonElm.style.display = "block";
  buttonElm.textContent = "Refresh";
  buttonElm.style.backgroundColor = "black";
  buttonElm.disabled = false;
}
function showError(message) {
  initialState.style.display = "none";
  fetchState.style.display = "none";
  sucessState.style.display = "none";
  rejectState.style.display = "block";

  rejectState.textContent = message;

  buttonElm.style.display = "block";
  buttonElm.style.backgroundColor = "red";
  buttonElm.textContent = "Click to Retry";

  if (message.includes("limit")) {
    buttonElm.disabled = true;
    let secondsLeft = 60;

    const countdown = setInterval(() => {
      secondsLeft--;
      buttonElm.textContent = `Retry in ${secondsLeft}s`;

      if (secondsLeft <= 0) {
        clearInterval(countdown);
        buttonElm.disabled = false;
        buttonElm.textContent = "Retry Now";
      }
    }, 1000);
  }
}

buttonElm.addEventListener("click", () => {
  fetchResult(currentLanguage);
});
