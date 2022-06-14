
const updateLeaderboard = (questionData, quizData, result, socket) => {

  const responseData = {
    players: [],
    time: questionData.time,
    questionCounter: `${quizData.currentQuestion}/${quizData.questions.length}`,
    question: questionData.question,
    joinCode: quizData.joinCode,
    questionNum: quizData.currentQuestion + 1
  };


  result.players.forEach((player) => {
    correctCount = player.answers.filter((answer) => answer.isCorrect === true).length;
    incorrectCount = player.answers.filter((answer) => answer.isCorrect === false).length;
    responseData.players.push({
      rank: player.rank,
      name: player.name,
      correctCount: (correctCount / quizData.questions.length) * 100,
      incorrectCount: (incorrectCount / quizData.questions.length) * 100,
      score: player.point
    });
  });
  console.log("data", responseData);
  // console.log("data", responseData);

  socket.emit("updateLeaderBoard", {
    data: responseData
  });
};

module.exports = { updateLeaderboard };