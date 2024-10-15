const express = require("express");
const app = express();
const port = 3000;

// Import the math utilities
const { getQuestion } = require("./utils/mathUtilities");

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
  res.render("quiz", { question }); // Pass the question to the view
});

//Handles quiz submissions.
app.post("/quiz", (req, res) => {
  const { answer } = req.body;
  console.log(`Answer: ${answer}`);

  //answer will contain the value the user entered on the quiz page
  //Logic must be added here to check if the answer is correct, then track the streak and redirect properly
  //By default we'll just redirect to the homepage again.
  res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
