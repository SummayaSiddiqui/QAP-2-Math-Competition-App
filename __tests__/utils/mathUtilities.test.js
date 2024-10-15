const {
  isCorrectAnswer,
  getQuestion,
} = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
  test("should generate a valid math question with two numbers and an operator", () => {
    const { question, answer } = getQuestion();

    expect(question).toMatch(/\d+ [+-] \d+/);

    expect(typeof answer).toBe("number");
  });
});

describe("Tests for isCorrectAnswer", () => {
  test("should return true for a correct answer", () => {
    const { question, answer } = getQuestion();
    const result = isCorrectAnswer(question, answer);

    expect(result).toBe(true);
  });

  test("should return false for an incorrect answer", () => {
    const { question } = getQuestion();
    const incorrectAnswer = -1;

    const result = isCorrectAnswer(question, incorrectAnswer);

    expect(result).toBe(false);
  });
});
