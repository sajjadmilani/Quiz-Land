const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const updateLanding = async (req, socket) => {
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

    const quizData = await db.collection("quizzes").findOne({ joinCode });
    const resultData = await db.collection("results").findOne({ _id: quizData.currentResult });
    const names = resultData.players.map((player) => {
      return player.name;
    });
    socket.broadcast.to(quizData.organizerSocketId)
      .emit("addParticipant", { data: names });
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

module.exports = { updateLanding };