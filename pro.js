const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const finalMsg = document.getElementById("finalMsg");
const typewriter = document.getElementById("typewriter");
const music = document.getElementById("bgMusic");

// 🎵 Allow autoplay on first click
document.body.addEventListener("click", () => {
  music.play();
}, { once: true });

// 💞 Typewriter effect
const text = "Will you be mine forever? 💍";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    typewriter.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
window.onload = typeWriter;

// 💔 No button dodging
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * (window.innerWidth - 150);
  const y = Math.random() * (window.innerHeight - 100);
  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});

// 💘 Yes button action
yesBtn.addEventListener("click", () => {
  finalMsg.innerHTML = "I love you, Sharvari 💍 You're my forever dream — Yours, Sahil ❤️";
  finalMsg.style.opacity = "1";

  // Floating hearts
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.className = "heart-bg";
    heart.textContent = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }

  // Fireworks animation
  startFireworks();
});

// 🎆 Fireworks
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const particles = [];

  function createParticle(x, y) {
    const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    return {
      x, y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8,
      color,
      alpha: 1
    };
  }

  function explode(x, y) {
    for (let i = 0; i < 30; i++) {
      particles.push(createParticle(x, y));
    }
  }

  yesBtn.addEventListener("click", e => explode(innerWidth / 2, innerHeight / 2));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;
      if (p.alpha <= 0) particles.splice(index, 1);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}
