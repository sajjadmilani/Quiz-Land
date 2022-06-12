const { mongoReadOne } = require('../dbHelpers');

const setQuiz = async (req, socket) => {
  console.log(req);
  const { joinCode } = req;
  const quizData = await mongoReadOne("quizzes", { joinCode });

  if (quizData) {
    socket.join(joinCode);
    socket.emit("wait", { data: quizData });
  }
  else {
    socket.emit("fail", { message: "fail" });
  }
};

module.exports = {
  setQuiz
};