const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;

// Import the math utilities
const { getQuestion, isCorrectAnswer } = require("./utils/mathUtilities");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public")); // To serve static files (e.g., CSS)

// Use express-session to manage session data
app.use(
  session({
    secret: "your-secret-key", // Change this to a secure random string
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize an empty leaderboard array
let leaderboard = [];

// Home route
app.get("/", (req, res) => {
  const streak = req.session.streak || 0;
  res.render("index", { streak });
});

// Quiz route
app.get("/quiz", (req, res) => {
  const { question } = getQuestion();
  const correctAnswers = 0; // Initialize correct answers to 0 when quiz starts
  res.render("quiz", { question, correctAnswers });
});

// Handle quiz submissions
app.post("/quiz", (req, res) => {
  const { answer, correctAnswers, question } = req.body;
  let correctAnswerCount = parseInt(correctAnswers, 10);

  if (isCorrectAnswer(question, answer)) {
    correctAnswerCount += 1; // Increment correct answers count if correct
    const { question: newQuestion } = getQuestion();
    res.render("quiz", {
      question: newQuestion,
      correctAnswers: correctAnswerCount,
    });
  } else {
    // If answer is wrong, redirect to the completion page
    res.redirect(`/completion?streak=${correctAnswerCount}`);
  }
});

// Completion route
app.get("/completion", (req, res) => {
  const streak = req.query.streak;
  const dateAchieved = new Date().toLocaleDateString();

  // Add the new streak to the leaderboard
  leaderboard.push({ streak: streak, date: dateAchieved });

  // Ensure only the latest 10 entries are kept in the leaderboard
  if (leaderboard.length > 10) {
    leaderboard.shift(); // Remove the oldest entry
  }

  // Save the streak in the session
  req.session.streak = streak;

  res.render("completion", { streak });
});

// Leaderboard route
app.get("/leaderboards", (req, res) => {
  res.render("leaderboard", { leaderboard });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
