const fetch = require('node-fetch');

const AnwersCreator = (correctAnswer, incorrectAnswers) => {
  const answers = [];
  incorrectAnswers.forEach((answer) => {
    answers.push({ text: answer, isCorrect: false });
  });
  answers.push({ text: correctAnswer, isCorrect: true });
  return answers.sort(() => Math.random() - 0.5);
};

const getAMultiChoice = async (req, res) => {
  await fetch("https://the-trivia-api.com/api/questions?categories=science,arts_and_literature&limit=1")
    .then(res => res.json())
    .then(data => {
      const questionData = data[0];
      randomizeAnswer = AnwersCreator(questionData.correctAnswer, questionData.incorrectAnswers);
      delete questionData.correctAnswer;
      delete questionData.incorrectAnswers;
      res.status(200).json({
        status: 200, data: {
          ...questionData,
          answers: randomizeAnswer
        }
      });
    });
};

const getATrueFalse = async (req, res) => {
  await fetch("https://opentdb.com/api.php?amount=1&type=boolean")
    .then(res => res.json())
    .then(data => {

      const questionData = data.results[0];
      randomizeAnswer = AnwersCreator(questionData.correct_answer, questionData.incorrect_answers);
      delete questionData.correct_answer;
      delete questionData.incorrect_answers;
      res.status(200).json({
        status: 200, data: {
          ...questionData,
          answers: randomizeAnswer
        }
      });
    });
};

const getAQuestion = async (req, res) => {
  await fetch("https://the-trivia-api.com/api/questions?limit=1")
    .then(res => res.json())
    .then(data => {
      const questionData = data[0];
      console.log(questionData);
      answer = [{ text: questionData.correctAnswer, isCorrect: true }];
      delete questionData.correctAnswer;
      delete questionData.incorrectAnswers;
      res.status(200).json({
        status: 200, data: {
          ...questionData,
          answers: answer
        }
      });
    });
};

module.exports = {
  getAMultiChoice,
  getATrueFalse,
  getAQuestion
};