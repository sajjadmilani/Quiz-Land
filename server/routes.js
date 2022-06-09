const { getCategories } = require('./handlers/categoryHandler');
const { addQuiz } = require('./handlers/quizHandlers');
const {
  getAMultiChoice,
  getATrueFalse,
  getAQuestion } = require('./handlers/randomHandler');

const router = require("express").Router();

router.get("/api/getRandom/MultiChoice", getAMultiChoice);
router.get("/api/getRandom/TrueFalse", getATrueFalse);
router.get("/api/getRandom/Question", getAQuestion);

router.get("/api/getCategories", getCategories);

router.post("/api/quiz", addQuiz);

router.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});
module.exports = router;
