const reddotContainer = document.querySelector(".reddot-container");
const pageBody = document.querySelector(".page-body");
const searchBar = document.querySelector(".search-reddot-post");
const addReddotBtn = document.querySelector(".add-reddot");
const searchContainer = document.querySelector(".search-container");

let savedSubs = JSON.parse(localStorage.getItem("myRedDots")) || [];

// console.log(subReddotPost);
//Show or hide search Container//
const plusIcon = document.querySelector(".plus");
plusIcon.addEventListener("click", (e) => {
  searchContainer.classList.toggle("hide");
});
const xMark = document.querySelector(".fa-xmark");
xMark.addEventListener("click", () => {
  searchContainer.classList.add("hide");
});

addReddotBtn.addEventListener("click", () => {
  const userVal = searchBar.value;
  searchBar.value = "";
  if (userVal == "") {
    searchContainer.classList.add("hide");
    showError("Cannot Fetch Empty Reddit");
  } else {
    searchContainer.classList.add("hide");
    fetchSubRedditData(userVal);
  }
});

async function fetchSubRedditData(subreddit, existingContainer = null) {
  const url = `https://www.reddit.com/r/${subreddit}.json`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Subreddit Not Found`);
    const data = await response.json();
    if (!data.data || !data.data.children || data.data.children.length === 0) {
      throw new Error("That reddot is empty or doesn't exist.");
    }
    const content = data.data.children;
    if (!savedSubs.includes(subreddit)) {
      savedSubs.push(subreddit);
      updateLocalStorage();
    }
    if (existingContainer) {
      existingContainer.innerHTML = "";
      showRedditPosts(content, existingContainer);
    } else {
      createTemplateShell(content);
    }
  } catch (error) {
    showError(error.message);
  }
}
function createTemplateShell(content) {
  const subreddit = content[0].data.subreddit;
  const template = document.querySelector(".sub-reddot-template");
  const clone = template.content.cloneNode(true);
  clone.querySelector(".sub-reddot-title").textContent = `r/${subreddit}`;
  const subReddotContainer = clone.querySelector(".sub-reddot-container");
  const postContainer = clone.querySelector(".post-container");

  clone.querySelector(".refresh").addEventListener("click", () => {
    postContainer.innerHTML = "Refetching...";
    fetchSubRedditData(subreddit, postContainer);
  });
  clone.querySelector(".remove").addEventListener("click", () => {
    subReddotContainer.remove();
    savedSubs = savedSubs.filter((sub) => sub !== subreddit);
    updateLocalStorage();
  });
  pageBody.appendChild(clone);
  showRedditPosts(content, postContainer);
}
function showRedditPosts(content, subReddotContainer) {
  console.log(content);
  content.forEach((post) => {
    const { author, url, ups, title, num_comments } = post.data;
    const template2 = document.querySelector(".sub-reddot-post-template");
    const clone = template2.content.cloneNode(true);
    clone.querySelector(".user-name").textContent = author;
    clone.querySelector(".post-title").textContent = title;
    clone.querySelector(".upvote-count").textContent = ups.toLocaleString();
    clone.querySelector(".comment-count").textContent = num_comments;
    clone.querySelector(".sub-reddot-post").addEventListener("click", () => {
      window.open(url);
    });
    subReddotContainer.appendChild(clone);
  });
}

function showError(message) {
  const errorElm = document.querySelector(".error");
  errorElm.textContent = message;

  errorElm.classList.add("show");

  const hideTimeout = setTimeout(() => {
    errorElm.classList.remove("show");
  }, 3000);

  errorElm.onclick = () => {
    clearTimeout(hideTimeout);
    errorElm.classList.remove("show");
  };
}

function updateLocalStorage() {
  localStorage.setItem("myRedDots", JSON.stringify(savedSubs));
}

savedSubs.forEach((subName) => {
  fetchSubRedditData(subName);
});
