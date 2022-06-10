const { query } = require('express');
const { ObjectId } = require('mongodb');
const { mongoCreate, mongoRead, mongoReadOne, mongoReadLimit } = require('../dbHelpers');


const randomString = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const addQuiz = async (req, res) => {
  const { name, category, user } = req.body;

  try {

    if (!(name && category && user)) {
      return res.status(400).json({ status: 400, message: "Not all required values have been sent!" });
    }
    let randomJoinCode = -1;

    while (randomJoinCode === -1) {
      const isExist = await mongoReadOne("quizzes", { joinCode: randomJoinCode });
      if (!isExist) {
        randomJoinCode = Math.floor(Math.random() * 1000000);
      }
    }

    const query = {
      name,
      category,
      createDate: new Date(),
      joinCode: randomJoinCode,
      userId: user.sub,
      questions: []
    };
    console.log(query);
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

const getQuizzesByUser = async (req, res) => {
  const { userId } = req.params;
  const query = { userId };
  try {
    const [total, quizzes] = await mongoReadLimit("quizzes", query, 0, 20);
    console.log(quizzes);
    quizzes ?
      res.status(200).json({ status: 200, total, data: quizzes }) :
      res.status(404).json({ status: 404, message: "Not found!" });
  }
  catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};


module.exports = { addQuiz, getQuiz, getQuizzesByUser };