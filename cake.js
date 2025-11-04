// ===== Create floating hearts =====
const container = document.querySelector(".container");
setInterval(() => {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 3 + "s";
  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}, 400);

// ===== Cake click logic =====
const cake = document.getElementById("/images/cutcake.jpg");
const message = document.getElementById("message");
const button = document.getElementById("continue");

cake.addEventListener("click", () => {
  // Replace cake image instantly
  cake.src = "/images/cutcake.jpg";

  // Show text and button after small delay
  message.classList.remove("hidden");
  button.classList.remove("hidden");

  setTimeout(() => {
    message.style.opacity = 1;
    button.style.opacity = 1;
  }, 200);
});

// ===== Continue button redirect =====
button.addEventListener("click", () => {
  window.location.href = "game.html";
});
