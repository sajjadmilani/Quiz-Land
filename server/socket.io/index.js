
const { endGame } = require('./organizerHandlers/endGame');
const { nextQuestion } = require('./organizerHandlers/nextQuestion');
const { organizerJoinQuiz } = require('./organizerHandlers/organizerJoinQuiz');
const { startQuiz } = require('./organizerHandlers/startQuiz');
const { answerQuestion } = require('./playersHandlers/answerQuestion');
const { joinQuiz } = require('./playersHandlers/joinQuiz');
const { setName } = require('./playersHandlers/setName');

const socketConnection = (io, socket) => {

  //Player Socket Endpoints
  socket.emit("conAcknowledge", { message: "Connected" });
  socket.on("joinQuiz", async (req) => await joinQuiz(req, socket));
  socket.on("setName", async (req) => await setName(req, socket));
  socket.on("answerQuestion", async (req) => await answerQuestion(req, socket));


  //Organizer Socket Endpoints
  socket.emit("conAcknowledge", { message: "Connected" });
  socket.on("organizerJoinQuiz", async (req) => await organizerJoinQuiz(req, socket));
  socket.on("startQuiz", async (req) => await startQuiz(req, socket));
  socket.on("nextQuestion", async (req) => await nextQuestion(req, socket));
  socket.on("endGame", async (req) => await endGame(req, socket));

};


module.exports = { socketConnection };