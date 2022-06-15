const { MongoClient } = require("mongodb");
const { questionTimeOut } = require('./questionTimeOut');
const { updateLeaderboard } = require('./updateLeaderboard');
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Next Question Handler
const nextQuestion = async (req, socket) => {
  const client = new MongoClient(MONGO_URI, options);

  try {

    //Connect client
    await client.connect();
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries

    const { joinCode } = req;
    let quizData = await db.collection("quizzes").findOne({ joinCode });

    //If there isn't any new question
    if (quizData.currentQuestion === quizData.questions.length) {
      return;
    }

    //Increase currentQuestion number in quizzes collection and return updated document
    const quizArray = await db.collection("quizzes").findOneAndUpdate(
      { joinCode },
      { $inc: { currentQuestion: 1 } },
      { returnDocument: "after" }
    );
    quizData = quizArray.value;

    //-----------------------------------------------------------------------------

    //Get the question by currentQuestion inside quizzes collection
    const questionData = await db.collection("questions").findOne(
      { _id: quizData.questions[quizData.currentQuestion - 1].questionId }
    );


    if (questionData) {

      //initial values before start each question
      const result = await db.collection("results").findOneAndUpdate(
        { _id: quizData.currentResult },
        {
          $push: {
            "players.$[].answers": {
              questionId: questionData._id,
              question: questionData.question,
              answer: null,
              isCorrect: false,
              points: 0,
              createDate: new Date(),
              submitDate: null
            }
          }
        },
        { returnOriginal: false }
      );

      //Remove correct answers from question detail before sending to players
      questionData.answers.forEach(answer => {
        delete answer.isCorrect;
      });
      //Remove organizerId from question detail before sending to players
      delete questionData.userId;

      //send new question to players
      socket.broadcast.to(joinCode).emit("newQuestion", {
        data: {
          ...questionData,
          questionNum: quizData.currentQuestion + 1,
          questionCounter: `${quizData.currentQuestion}/${quizData.questions.length}`
        }
      });

      //update leaderboard
      updateLeaderboard(questionData, quizData, result.value, socket);

      //Expire question after inserted time
      questionTimer = setTimeout(async () => {
        await questionTimeOut(quizData, questionData);
      }, (questionData.time + 3) * 1000);

    }
    else {
      socket.emit("fail", { message: "fail" });
    }
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
module.exports = { nextQuestion };