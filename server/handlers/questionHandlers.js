const { MongoClient, ObjectId } = require("mongodb");
const { mongoReadOne } = require('../dbHelpers');
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const addQuestion = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { quiz, type, difficulty, point, time, question, answers, userId } = req.body;
  try {
    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries
    const questionData = await db.collection("questions").insertOne({ quiz: ObjectId(quiz), type, difficulty, point, time, question, answers, userId });
    console.log(questionData);
    const quizQuery = { _id: ObjectId(quiz) };
    const quizData = await db.collection("quizzes").findOne(quizQuery);
    const questions = [...quizData.questions];

    questions.push({ questionId: questionData.insertedId, questionType: type });
    const result = await db.collection("quizzes").updateOne(quizQuery, { $set: { questions: questions } });
    console.log(result);
    result.modifiedCount === 1 ?
      res.status(200).json({ status: 200, message: "Question Inserted" }) :
      res.status(400).json({ status: 400, message: "There is a problem while inserting question" });

  }

  catch (error) {
    console.log(error);
  }

  finally {
    //Close client
    client.close();
    console.log("disconnected!");
    //Close client
  }


};

const getQuestion = async (req, res) => {
  const { _id } = req.params;
  const query = { _id: ObjectId(_id) };
  try {
    const quesionData = await mongoReadOne("questions", query);
    quesionData ?
      res.status(200).json({ status: 200, data: quesionData }) :
      res.status(404).json({ status: 404, message: "Not found!" });
  }
  catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};


module.exports = { addQuestion, getQuestion };