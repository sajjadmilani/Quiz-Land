const router = require("express").Router();

const { getCategories } = require('../handlers/categoryHandlers');
const { getUser, authorizeUser } = require('../handlers/userHandlers');
const { addQuiz, getQuiz, getQuizzesByUser } = require('../handlers/quizHandlers');
const {
  getAMultiChoice,
  getATrueFalse,
  getAQuestion } = require('../handlers/randomHandlers');
const { addQuestion, getQuestion } = require('../handlers/questionHandlers');

//Qustions Endpoints
router.post("/api/question", addQuestion);
router.get("/api/question/:_id", getQuestion);
router.get("/api/getRandom/MultiChoice", getAMultiChoice);
router.get("/api/getRandom/TrueFalse", getATrueFalse);
router.get("/api/getRandom/Question", getAQuestion);

//Category Endpoints
router.get("/api/getCategories", getCategories);

//Quiz Endpoints
router.post("/api/quiz", addQuiz);
router.get("/api/quiz/:_id", getQuiz);
router.get("/api/quizzes/:userId", getQuizzesByUser);

//User Endpoints
router.post("/api/user/authorize", authorizeUser);
router.get("/api/user/:sub", getUser);

router.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

module.exports = router;
