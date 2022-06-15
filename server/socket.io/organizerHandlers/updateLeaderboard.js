const { rankCalculator } = require('../helpers/rankCalculator');


const updateLeaderboard = async (questionData, quizData, result, socket) => {

  //Update the rank of players in results collection
  const isUpdated = await rankCalculator(quizData.currentResult);

  //Update flag
  if (isUpdated === true) {

    //Implement response data before send to organizer
    const responseData = {
      players: [],
      time: questionData.time,
      questionCounter: `${quizData.currentQuestion}/${quizData.questions.length}`,
      question: questionData.question,
      joinCode: quizData.joinCode,
      questionNum: quizData.currentQuestion + 1
    };

    //Push new players data
    result.players.forEach((player) => {
      correctCount = player.answers.filter((answer) => answer.isCorrect === true).length;
      incorrectCount = player.answers.filter((answer) => answer.isCorrect === false && answer.answer !== null).length;
      responseData.players.push({
        rank: player.rank,
        name: player.name,
        correctCount: (correctCount / quizData.questions.length) * 100,
        incorrectCount: (incorrectCount / quizData.questions.length) * 100,
        score: player.points
      });
    });

    //If request came from player or organizer
    quizData.organizerSocketId === socket.id ?
      socket.emit("updateLeaderBoard", { data: responseData }) :
      socket.broadcast.to(quizData.organizerSocketId).emit("updateLeaderBoard", { data: responseData });
  }
};

module.exports = { updateLeaderboard };