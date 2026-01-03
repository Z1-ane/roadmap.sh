const reddotContainer = document.querySelector(".reddot-container");
const pageBody = document.querySelector(".page-body");
const searchBar = document.querySelector(".search-reddot-post");
const addReddotBtn = document.querySelector(".add-reddot");

const searchContainer = document.querySelector(".search-container");

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
    fetchredditpost(userVal);
  }
});

async function fetchredditpost(subreddit) {
  const url = `https://www.reddit.com/r/${subreddit}.json`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Subreddit "${subreddit}" not found`);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    const template = document.querySelector(".sub-reddot-template");
    const clone = template.content.cloneNode(true);
    const reddotContainer = clone.querySelector(".sub-reddot-container");
    const postContainer = clone.querySelector(".post-container");
    clone.querySelector(".sub-reddot-title").textContent = `/r/${subreddit}`;

    // clone.querySelector(".refresh").addEventListener("click", () => {
    //   reddotContainer.innerHTML = "Hey It's Loading";
    //   fetchredditpost(subreddit);
    // });

    clone.querySelector(".remove").addEventListener("click", () => {
      reddotContainer.remove();
    });
    pageBody.appendChild(clone);
    showRedditPosts(data.data.children, postContainer);
  } catch (error) {
    showError(error);
  }
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
  errorElm.classList.remove("hide-error");
  setTimeout(() => {
    errorElm.classList.add("hide-error");
  }, 3000);
}
