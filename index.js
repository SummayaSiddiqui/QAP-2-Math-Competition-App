const express = require("express");
const app = express();
const port = 3000;

// Import the math utilities
const { getQuestion, isCorrectAnswer } = require("./utils/mathUtilities");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public")); // To serve static files (e.g., CSS)

// Some routes required for full functionality are missing here. Only get routes should be required
// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// Quiz route
app.get("/quiz", (req, res) => {
  const { question } = getQuestion(); // Get a random math question
  const streak = 0; // Initialize streak to 0 when quiz starts
  const correctAnswers = 0; // Initialize correct answers to 0 when quiz starts
  res.render("quiz", { question, streak, correctAnswers });
});

// Handle quiz submissions
app.post("/quiz", (req, res) => {
  const { answer, correctAnswers, question } = req.body;
  const { question: newQuestion } = getQuestion();

  let correctAnswerCount = parseInt(correctAnswers, 10); // Convert correct answers to a number

  // Check if the user's answer is correct
  if (isCorrectAnswer(question, answer)) {
    correctAnswerCount += 1; // Increment correct answers count if correct
  } else {
    currentStreak = 0; // Reset streak if incorrect
  }

  // Render the next question with updated streak and correct answers count
  res.render("quiz", {
    question: newQuestion,
    correctAnswers: correctAnswerCount,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
