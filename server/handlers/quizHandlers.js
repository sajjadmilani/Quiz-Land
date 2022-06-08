const { mongoCreate, mongoRead } = require('../dbHelpers');



const addQuiz = (req, res) => {
  const { name, category, user } = req.body;
  res.status(200).json({ name, category, user.sub });
};

module.exports = { addQuiz };