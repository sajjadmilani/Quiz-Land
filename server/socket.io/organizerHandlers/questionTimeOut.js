const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const questionTimeOut = async (quizData, questionData) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries
    await db.collection("results").findOneAndUpdate(
      {
        _id: quizData.currentResult,
        "players.answers.questionId": questionData._id,
        "players.answers.submitDate": null
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
    console.log("disconnected!");
    //Close client
  }
};

module.exports = { questionTimeOut };