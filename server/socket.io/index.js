const { setQuiz, setName } = require("./playerHandlers");
const { setOrganizerQuiz, startQuiz } = require("./organizerHandlers");
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
  socket.on("setName", async (req) => await setName(req, socket));

  socket.on('Answer', (req) => {
    socket.emit("wait", { data: "Connected" });
  });

  //Organizer Socket Endpoints

  socket.emit("conAcknowledge", { message: "Connected" });
  socket.on("setOrganizerQuiz", async (req) => await setOrganizerQuiz(req, socket));
  socket.on("startQuiz", async (req) => await startQuiz(req, socket));


};


module.exports = { socketConnection };