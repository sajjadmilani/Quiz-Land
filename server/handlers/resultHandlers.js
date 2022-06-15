const { mongoReadLimit } = require('../dbHelpers');
//Get all results by user
const getResultByUser = async (req, res) => {
  console.log("test");

  const query = { userId: req.params.sub };
  try {
    const [total, quizzes] = await mongoReadLimit("results", query, 0, 20);

    quizzes ?
      res.status(200).json({ status: 200, total, data: quizzes }) :
      res.status(404).json({ status: 404, message: "Not found!" });
  }
  catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};


module.exports = { getResultByUser };