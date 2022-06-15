const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const organizerJoinQuiz = async (req, socket) => {
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

    if (quizData) {
      const query = { joinCode };


      const newValue = {
        $set: { currentQuestion: 0, organizerSocketId: socket.id, status: "pendingJoin" }
      };
      const quizUpdate = await db.collection("quizzes").updateOne(query, newValue);
      if (quizUpdate.modifiedCount === 1) {
        const resultStatus = await db.collection("results").insertOne({
          quizId: quizData._id,
          name: quizData.name,
          userId: quizData.userId,
          players: [],
          joinCode: quizData.joinCode,
        });
        await db.collection("quizzes").updateOne({ joinCode }, { $set: { currentResult: resultStatus.insertedId } });
      }

      const resultData = await db.collection("results").findOne({ _id: quizData.currentResult });

      socket.join(joinCode);
      socket.emit("waitForJoin", { data: resultData });
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

module.exports = { organizerJoinQuiz };