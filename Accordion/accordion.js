let qns = document.querySelectorAll(".question");
let ans = document.querySelectorAll(".answer");
let state = true;
console.log(qns);
qns.forEach((qn, index) => {
  qn.addEventListener("click", () => {
    ans.forEach((ans, i) => {
      if (index === i) {
        if (ans.style.display === "block") {
          ans.style.display = "none";
        } else ans.style.display = "block";
      } else {
        ans.style.display = "none";
      }
    });
  });
});
