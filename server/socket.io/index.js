const { setQuiz } = require('./playerHandlers');

const data = {
  "status": 200,
  "data": {
    "quiz": "62a2d2259cc3f50bf5138a2a",
    "type": "TrueFalse",
    "difficulty": "easy",
    "point": null,
    "time": null,
    "question": "Where is the Taj Mahal?",
    "answers": [
      {
        "text": "A Fry",
      },
      {
        "text": "A Caterpillar",
      },
      {
        "text": "A Maggot",
      },
      {
        "text": "A Lamb",
      }
    ],
    "userId": "google-oauth2|109428292931827281437"
  }
};
const socketConnection = (io, socket) => {
  //Player Socket Endpoints

  socket.emit("conAcknowledge", { message: "Connected" });

  socket.on("setQuiz", async (req) => await setQuiz(req, socket));

  socket.on('Answer', (req) => {
    socket.emit("wait", { data: "Connected" });
  });

  //Organizer Socket Endpoints
  socket.on('newMessageToServer', (msg) => {
    // console.log(msg)
    io.emit('messageToClients', { text: msg.text });
  });
};


module.exports = { socketConnection };