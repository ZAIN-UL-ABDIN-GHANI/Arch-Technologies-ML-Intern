// Get elements
const canvas = document.getElementById("sketchpad");
const ctx = canvas.getContext("2d");
const predictButton = document.getElementById("predict_button");
const resultSpan = document.getElementById("result");
const confidenceSpan = document.getElementById("confidence_percentage");
const tutorialDiv = document.getElementById("tutorial");
let isDrawing = false;

// Set up canvas
canvas.width = 300;
canvas.height = 300;
ctx.lineWidth = 15;
ctx.lineCap = "round";
ctx.strokeStyle = "#000";

// Draw on canvas
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  resultSpan.textContent = "-";
  confidenceSpan.textContent = "0%";
}

// Predict the digit
function predictDigit() {
  const imageData = canvas.toDataURL().split(",")[1];
  // This is where you'd add your prediction logic using TensorFlow.js
  // For now, simulating prediction with dummy data
  const predictedDigit = Math.floor(Math.random() * 10);
  const confidence = Math.floor(Math.random() * 100);
  
  resultSpan.textContent = predictedDigit;
  confidenceSpan.textContent = confidence + "%";
}

// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Toggle tutorial
function toggleTutorial() {
  tutorialDiv.classList.toggle("hidden");
}

// Show tutorial on load
window.onload = function () {
  setTimeout(() => {
    tutorialDiv.classList.remove("hidden");
  }, 1000);
};
