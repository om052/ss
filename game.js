// 💞 Predefined Questions
const questions = [
  {
    question: "What's my favorite color?",
    options: ["Blue 💙", "Red ❤️", "Black 🖤", "Pink 💗"],
    correct: "Blue 💙",
  },
  {
    question: "Which place we both love to visit?",
    options: ["Goa 🏖️", "Manali ❄️", "Paris 💐", "Kashmir 🌸"],
    correct: "Kashmir 🌸",
  },
  {
    question: "Which movie do we both enjoy?",
    options: ["Taqdeer 🎬", "Titanic 🚢", "3 Idiots 🎓", "KGF 🔥"],
    correct: "3 Idiots 🎓",
  },
  {
    question: "What’s our favorite food together?",
    options: ["Pizza 🍕", "Pani Puri 🌶️", "Burger 🍔", "Ice Cream 🍨"],
    correct: "Pani Puri 🌶️",
  },
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score");
const continueBtn = document.getElementById("continue-btn");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

// 🌸 Show Question
function showQuestion() {
  const q = questions[currentQuestion];
  questionElement.textContent = q.question;
  optionsElement.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("option");
    btn.onclick = () => selectOption(btn, q.correct);
    optionsElement.appendChild(btn);
  });
}

function selectOption(selected, correct) {
  const options = document.querySelectorAll(".option");
  options.forEach((btn) => (btn.disabled = true));

  if (selected.textContent === correct) {
    selected.classList.add("correct");
    correctSound.play();
    score++;
  } else {
    selected.classList.add("wrong");
    wrongSound.play();
    options.forEach((btn) => {
      if (btn.textContent === correct) btn.classList.add("correct");
    });
  }

  nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    nextButton.classList.add("hidden");
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("game-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  const percent = Math.round((score / questions.length) * 100);
  scoreText.textContent = `You both know each other ${percent}% 💞`;

  // Add a sparkle animation
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="sparkle">✨ ${percent}% ✨</div>`
  );
  setTimeout(() => document.querySelector(".sparkle")?.remove(), 2000);
}

continueBtn.addEventListener("click", () => {
  window.location.href = "sl.html";
});

// Initialize
showQuestion();

