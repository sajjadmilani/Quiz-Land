const { MongoClient } = require("mongodb");
const { categories } = require("./data");

require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries

    //Insert each category to collection
    categories.forEach(async (category) => {
      await db.collection("categories").insertOne({ name: category });
    });


    //Create questions collection
    await db.createCollection("questions");

    //Create quizzes collection
    await db.createCollection("quizzes");

    //Create result collection
    await db.createCollection("result");

    //Create Users collection
    await db.createCollection("users");
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

batchImport();
