
const { ObjectId } = require('mongodb');
const { mongoCreate, mongoReadOne, mongoReadLimit } = require('../dbHelpers');

//Add a quiz
const addQuiz = async (req, res) => {
  const { name, category, user } = req.body;

  try {

    //If required data not inserted
    if (!(name && category && user)) {
      return res.status(400).json({ status: 400, message: "Not all required values have been sent!" });
    }

    //Generate a random unique joinCode
    let randomJoinCode = "";
    while (randomJoinCode === "") {
      const isExist = await mongoReadOne("quizzes", { joinCode: randomJoinCode });
      if (!isExist) {
        randomJoinCode = String(Math.floor(Math.random() * 1000000));
      }
    }

    //Insert new quiz
    const query = {
      name,
      category,
      createDate: new Date(),
      joinCode: randomJoinCode,
      userId: user.sub,
      questions: []
    };
    const result = await mongoCreate("quizzes", query);

    (result.insertedId) ?
      res.status(200).json({ status: 200, data: { id: result.insertedId, joinCode: randomJoinCode } }) :
      res.status(400).json({ status: 400, message: "There is a problem on inserting data!" });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: error.message });
  }
};

//Get a Quiz by Id
const getQuiz = async (req, res) => {
  const _id = req.params._id;
  const query = { _id: ObjectId(_id) };
  try {
    const quiz = await mongoReadOne("quizzes", query);
    quiz ?
      res.status(200).json({ status: 200, data: quiz }) :
      res.status(404).json({ status: 404, message: "Not found!" });
  }
  catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

//Get all quizzes by user
const getQuizzesByUser = async (req, res) => {
  const { userId } = req.params;
  const query = { userId };
  try {
    const [total, quizzes] = await mongoReadLimit("quizzes", query, 0, 20);

    quizzes ?
      res.status(200).json({ status: 200, total, data: quizzes }) :
      res.status(404).json({ status: 404, message: "Not found!" });
  }
  catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};


module.exports = { addQuiz, getQuiz, getQuizzesByUser };