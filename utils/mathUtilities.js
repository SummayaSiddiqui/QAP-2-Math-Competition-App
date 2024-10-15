/**
 * Gets a random multiplication, division, subtraction or addition question
 *
 * @returns {} The randomly generated math question
 */
function getQuestion() {
  const operations = ["+", "-"];
  let num1, num2, operation;

  // Randomly select an operation
  operation = operations[Math.floor(Math.random() * operations.length)];
  switch (operation) {
    case "+":
      num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 100
      num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 100
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;
    case "-":
      // Ensure num1 is greater than num2
      num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 100
      num2 = Math.floor(Math.random() * num1) + 1; // Random number between 1 and num1
      question = `${num1} - ${num2}`;
      answer = num1 - num2;
      break;
  }
  return { question, answer };
}

/**
 * Parses the provided question and gets whether or not the provided answer is correct
 *
 * @param {*} question The question being answered
 * @param {*} answer The potential answer
 * @returns {boolean} True if the answer was correct, false otherwise.
 */
function isCorrectAnswer(question, answer) {
  const correctAnswer = eval(question); // Evaluate the question string to get the answer
  return parseFloat(answer) === correctAnswer; // Compare the parsed answer with the correct answer
}

module.exports = {
  getQuestion,
  isCorrectAnswer,
};
