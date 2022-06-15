const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//End game handler
const endGame = async (req, socket) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    const { joinCode } = req;
    //Connect client
    await client.connect();
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries

    //Get the quiz by joinCode
    const quizData = await db.collection("quizzes").findOne({ joinCode });

    //Get result by _id (current result id stored in each quizzes)
    const resultData = await db.collection("results").findOne({ _id: quizData.currentResult });

    //Send an emit to each user for showing result page
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

    //Send an emit to organizer to show final result (:D surprise!)
    socket.emit("finalResult", { data: { name: resultData.players.find(player => player.rank === 1).name } });

  }
  catch (error) {
    console.log(error);
  }

  finally {
    //Close client
    client.close();
    //Close client
  }
};

module.exports = { endGame };