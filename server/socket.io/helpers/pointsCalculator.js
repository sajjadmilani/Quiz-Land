const pointsCalculator = (answerIsCorrect, correctAnsweredCount, questionPoint) => {
  //Calculate points by evaluate answer is correct or not
  let point = answerIsCorrect ? 100 : 0;
  //Calculate the extra points by considering which player responds sooner
  if (answerIsCorrect && correctAnsweredCount < 3) { point += (20 / (correctAnsweredCount + 1)); }
  //Add question score coefficient
  return point * questionPoint;
};
module.exports = { pointsCalculator };