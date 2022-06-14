const { MongoClient } = require("mongodb");
const { nextQuestion } = require('./nextQuestion');
const { updateLeaderboard } = require('./updateLeaderboard');
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const startQuiz = async (req, socket) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries
    const { joinCode } = req;
    const quizUpdateData = await db.collection("quizzes").findOneAndUpdate(
      { joinCode }, { $set: { status: "playing" } });
    const quizData = quizUpdateData.value;

    const newValues = {
      $set: {
        "players.$[].answers": [],
        "players.$[].point": 0,
        "players.$[].rank": 0
      }
    };

    const result = await db.collection("results").findOneAndUpdate(
      { _id: quizData.currentResult },
      newValues,
      { returnOriginal: false }
    );


    await nextQuestion(req, socket);

    // setTimeout(() => {
    //   socket.broadcast.to(joinCode).emit("wait", { data: quizData });
    // }, (questionData.time + 3) * 1000);

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

module.exports = { startQuiz };