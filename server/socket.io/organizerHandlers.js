const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { mongoReadOne, mongoUpdateOne, mongoCreate } = require('../dbHelpers');

const setOrganizerQuiz = async (req, socket) => {
  const { joinCode } = req;
  const quizData = await mongoReadOne("quizzes", { joinCode });

  if (quizData) {
    const query = { joinCode };

    const newValue = { $set: { currentQuestion: 1, organizerSocketId: socket.id, status: "pendingJoin" } };
    const quizUpdate = await mongoUpdateOne("quizzes", query, newValue);
    // if (quizUpdate.modifiedCount === 1) {
    //   await mongoCreate("results", {
    //     quizId: quizData._id,
    //     name: quizData.name,
    //     userId: quizData.userId,
    //     players: [],
    //     joinCode: quizData.joinCode
    //   });
    // }
    const resultData = await mongoReadOne("results", { joinCode });
    socket.join(joinCode);
    socket.emit("wait", { data: resultData });
  }
  else {
    socket.emit("fail", { message: "fail" });
  }
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
    const { joinCode, name } = req;

    const room = socket.rooms[1];
    console.log("room", room);
    const quizData = await db.collection("quizzes").findOne({ joinCode });
    const resultData = await db.collection("results").findOne({ joinCode });
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


// const updateLanding = async (req, socket) => {
//   console.log(req);
//   console.log(socket.id);
//   const { joinCode } = req;
//   const quizData = await mongoReadOne("quizzes", { joinCode });

//   if (quizData) {
//     socket.join(joinCode);
//     socket.emit("wait", { data: quizData });
//   }
//   else {
//     socket.emit("fail", { message: "fail" });
//   }
// };

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
    const quizData = await db.collection("quizzes").findOne({ joinCode });

    const questionData = await db.collection("questions").findOne(
      { _id: quizData.questions[quizData.currentQuestion].questionId });

    const updateQuiz = await db.collection("quizzes").updateOne({ joinCode },
      { $set: { status: "playing", currentQuestion: 2 } });

    if (questionData) {
      socket.broadcast.to(joinCode).emit("newQuestion", { data: questionData });
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

module.exports = {
  setOrganizerQuiz, updateLanding, startQuiz
};