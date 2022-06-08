const fetch = require('node-fetch');
const { decode } = require('html-entities');

const AnwersCreator = (correctAnswer, incorrectAnswers) => {
  const answers = [];
  incorrectAnswers.forEach((answer) => {
    answers.push({ text: decode(answer, { level: 'html5' }), isCorrect: false });
  });
  answers.push({ text: decode(correctAnswer, { level: 'html5' }), isCorrect: true });
  return answers.sort(() => Math.random() - 0.5);
};

const getAMultiChoice = async (req, res) => {
  const difficulty = req.query.difficulty;
  await fetch(`https://the-trivia-api.com/api/questions?difficulty=${difficulty}&limit=1`)
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
  const difficulty = req.query.difficulty;
  await fetch(`https://opentdb.com/api.php?amount=1&type=boolean&difficulty=${difficulty}`)
    .then(res => res.json())
    .then(data => {

      const questionData = data.results[0];
      console.log(decode(questionData.question, { level: 'html5' }));
      randomizeAnswer = AnwersCreator(questionData.correct_answer, questionData.incorrect_answers);
      delete questionData.correct_answer;
      delete questionData.incorrect_answers;
      res.status(200).json({
        status: 200, data: {
          category: questionData.category,
          difficulty: questionData.difficulty,
          question: decode(questionData.question, { level: 'html5' }),
          answers: decode(randomizeAnswer),

        }
      });
    });
};

const getAQuestion = async (req, res) => {
  const difficulty = req.query.difficulty;
  await fetch(`https://the-trivia-api.com/api/questions?difficulty=${difficulty}&limit=1`)
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