const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const endGame = async (req, socket) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { joinCode } = req;
    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries
    const quizData = await db.collection("quizzes").findOne({ joinCode });

    const resultData = await db.collection("results").findOne({ _id: quizData.currentResult });
    resultData.players.forEach((player) => {
      correctCount = player.answers.filter((answer) => answer.isCorrect === true).length;
      incorrectCount = player.answers.filter((answer) => answer.isCorrect === false && answer.answer !== null).length;
      socket.broadcast.to(player.socketId).emit("result", {
        data: {
          rank: `${player.rank}/${resultData.players.length}`,
          name: player.name,
          correctCount,
          incorrectCount,
          score: player.points
        }
      });
    });

    socket.emit("finalResult", { data: { name: resultData.players.find(player => player.rank === 1).name } });

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

module.exports = { endGame };