const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const addQuestion = async () => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.params;
  const { type, difficulty, question, incorrectAnswers, correctAnswer, userId } = req.body;
  try {
    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries

    const quiz = db.collection("quizzes").findOne({ _id: ObjectId(_id) });
    const questions = [...quiz.questions];
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