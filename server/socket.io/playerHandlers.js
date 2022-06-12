const { mongoReadOne, mongoUpdateOne } = require('../dbHelpers');
const { updateLanding } = require('./organizerHandlers');

const setQuiz = async (req, socket) => {
  console.log(req);
  console.log(socket.id);
  const { joinCode } = req;
  const quizData = await mongoReadOne("quizzes", { joinCode });

  if (quizData && quizData.status === "pendingJoin") {
    const newValue = { $addToSet: { players: { socketId: socket.id } } };
    const result = await mongoUpdateOne("results", { joinCode }, newValue);


    socket.emit("nameRequest", { data: quizData });
  }
  else {
    socket.emit("fail", { message: "fail" });
  }
};

const setName = async (req, socket) => {
  console.log(req);
  console.log(socket.id);
  const { joinCode } = req;
  const resultData = await mongoReadOne("results", { joinCode });
  const query = { joinCode, "players.socketId": socket.id };
  const newValues = { $set: { "players.$.name": req.name } };
  await mongoUpdateOne("results", query, newValues);
  socket.join(joinCode);
  await updateLanding(req, socket);
  socket.emit("wait", { data: resultData });



};

module.exports = {
  setQuiz, setName
};