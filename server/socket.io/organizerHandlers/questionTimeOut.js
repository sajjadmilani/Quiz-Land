const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Question timeout handler
const questionTimeOut = async (quizData, questionData) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    //Connect client
    await client.connect();
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries
    await db.collection("results").findOneAndUpdate(
      {
        _id: quizData.currentResult,
        "players.answers.questionId": questionData._id,
        "players.answers.answer": null
      },
      { $set: { "players.$[].answers.$.submitDate": new Date() } },

    );
  }
  catch (error) {
    console.log(error);
  }
  finally {
    //Close client
    client.close();
    //Close client
  }
};

module.exports = { questionTimeOut };