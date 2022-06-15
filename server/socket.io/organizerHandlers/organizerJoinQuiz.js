const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Join the organizer handler
const organizerJoinQuiz = async (req, socket) => {
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

    if (quizData) {

      //Update quiz status to "Pending Join"
      const newValue = {
        $set: { currentQuestion: 0, organizerSocketId: socket.id, status: "pendingJoin" }
      };
      const quizUpdate = await db.collection("quizzes").updateOne({ joinCode }, newValue);

      //If update succesfully then insert a result to results collection to start the quiz
      if (quizUpdate.modifiedCount === 1) {
        const result = {
          quizId: quizData._id,
          name: quizData.name,
          userId: quizData.userId,
          players: [],
          joinCode: quizData.joinCode,
        };
        const resultStatus = await db.collection("results").insertOne(result);

        await db.collection("quizzes").updateOne({ joinCode }, { $set: { currentResult: resultStatus.insertedId } });

        socket.join(joinCode);
        socket.emit("waitForJoin", { data: { ...result, _id: resultStatus.insertedId } });
      }


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