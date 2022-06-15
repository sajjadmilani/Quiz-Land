const { MongoClient } = require("mongodb");
const { pointsCalculator } = require('../helpers/pointsCalculator');
const { updateLeaderboard } = require('../organizerHandlers/updateLeaderboard');

require("dotenv").config();
const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const answerQuestion = async (req, socket) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { joinCode, insertedAnswer } = req;

    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries

    //Get current quiz data
    const quizData = await db.collection("quizzes").findOne({ joinCode });

    //Get current question data
    const questionData = await db.collection("questions").findOne(
      { _id: quizData.questions[quizData.currentQuestion - 1].questionId }
    );


    //Get current quiz result Data
    const resultData = await db.collection("results").findOne({ _id: quizData.currentResult });
    console.log("socket", socket.id);
    console.log("============================================");
    console.log(resultData.players.find(player => player.socketId === socket.id));
    if (resultData.players.find(player => player.socketId === socket.id).answers[quizData.currentQuestion - 1].answer !== null) {

      socket.emit("fail", { message: "The Question answered before" });
      return;
    }
    answerIsCorrect = questionData.answers.some(answer => answer.isCorrect && answer.text === insertedAnswer);




    //Filter players who answered the current question correctly 
    const correctAnsweredPlayers = resultData.players.filter((player) => {
      return player.answers[quizData.currentQuestion - 1].isCorrect === true;
    });

    const points = pointsCalculator(answerIsCorrect, correctAnsweredPlayers.length, questionData.point);

    if (questionData) {
      const questionSelector = `players.$.answers.${quizData.currentQuestion - 1}`;
      // Update answered question of target user;
      await db.collection("results").findOneAndUpdate(
        { _id: quizData.currentResult, "players.socketId": socket.id },
        {
          $inc: {
            "players.$.points": points
          },
          $set: {
            [questionSelector + ".answer"]: insertedAnswer,
            [questionSelector + ".points"]: points,
            [questionSelector + ".isCorrect"]: answerIsCorrect,
            [questionSelector + ".submitDate"]: new Date()
          }
        }
      );

      const result = await db.collection("results").findOne(
        { _id: quizData.currentResult }
      );

      answerIsCorrect ?
        socket.emit("success", { message: "CORRECT!" }) :
        socket.emit("fail", { message: "INCORRECT!" });

      //Update leaderboard
      updateLeaderboard(questionData, quizData, result, socket);
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
module.exports = { answerQuestion };