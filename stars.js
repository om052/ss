const messages = [
  "You’re the brightest star in my sky 💫",
  "Every broken star in the sky knows your name — because I’ve wished for you too many times. 💕",
  "You light up my world like no one else ✨",
  "You’re my favorite kind of magic 🌙",
  "My only wish is you and i want to make u mine !!!       plz  💞"
];

let current = 0;
const container = document.getElementById("stars-container");
const msgBox = document.getElementById("message-box");
const msgText = document.getElementById("message-text");
const nextBtn = document.getElementById("next-star");

// Create random stars
for (let i = 0; i < 20; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.top = Math.random() * 90 + "%";
  star.style.left = Math.random() * 90 + "%";
  star.addEventListener("click", showMessage);
  container.appendChild(star);
}

function showMessage(e) {
  msgBox.classList.remove("hidden");
  msgText.textContent = messages[current];
  e.target.style.background = "#ffb6f9";
  e.target.style.boxShadow = "0 0 15px #ffb6f9";
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < messages.length) {
    msgText.textContent = messages[current];
  } else {
    msgText.textContent = "You’re my forever star — the one I wished for and never want to let go";
    nextBtn.textContent = "Continue 💖";
    nextBtn.onclick = () => (window.location.href = "index.html");
  }
});
