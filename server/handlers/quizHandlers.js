const { mongoCreate, mongoRead } = require('../dbHelpers');

const randomString = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const addQuiz = async (req, res) => {
  const { name, category, user } = req.body;

  let randomJoinCode = "";

  while (randomJoinCode === "") {
    const isExist = await mongoRead("quizzes", { joinCode: randomJoinCode });
    console.log(isExist);
    randomJoinCode = randomString(10);
  }

  const query = {
    name,
    category,
    createDate: new Date(),
    joinCode: randomJoinCode,
    userID: user.sub,
    questions: []
  };

  const result = await mongoCreate("quizzes", query);
  console.log(result);
  res.status(200).json({ status: 200, data: { id: result.insertedId, joinCode: randomJoinCode } });
};

module.exports = { addQuiz };