const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const joinQuiz = async (req, socket) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries

    const { joinCode, user } = req;
    const quizData = await db.collection("quizzes").findOne({ joinCode });

    //User join while the quiz status is pendingJoin 
    if (quizData && quizData.status === "pendingJoin") {

      const resultData = await db.collection("results").findOne({ _id: quizData.currentResult });

      //If user joined before
      if (!resultData.players.some((player) => player.userId === user)) {
        await db.collection("results").updateOne(
          { _id: quizData.currentResult },
          { $addToSet: { players: { socketId: socket.id, userId: user } } }
        );

      }

      //If user didn't join before
      else {
        await db.collection("results").updateOne(
          { _id: resultData._id, "players.userId": user },
          { $set: { "players.$.socketId": socket.id } }
        );
      }

      socket.emit("nameRequest", { data: quizData });
    }

    //User join while the quiz status is playing 
    else if (quizData && quizData.status === "playing") {
      const quizUpdateData = await db.collection("results").findOneAndUpdate(
        { joinCode, "players.userId": user }, { $set: { "players.$.socketId": socket.id } });

      const questionData = await db.collection("questions").findOne(
        { _id: quizData.questions[quizData.currentQuestion].questionId });

      socket.emit("newQuestion", {
        data: { ...questionData, questionNum: quizData.currentQuestion }
      });
      socket.join(joinCode);
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

module.exports = { joinQuiz };