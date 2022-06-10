const { ObjectId, MongoClient } = require('mongodb');
const { mongoCreate, mongoRead, mongoReadOne, mongoReadLimit } = require('../dbHelpers');


const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const authorizeUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { email } = req.body;
  const query = { email };
  try {
    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries
    const userData = await db.collection("users").findOne(query);
    if (userData) {
      if (userData.sub) {
        return res.status(200).json({ status: 200, message: "Authorized" });
      }
      else {
        const result = await db.collection("users").updateOne(query, { ...user, sub: user.sub });
        if (result.modifiedCount === 1) {
          return res.status(200).json({ status: 200, message: "Authorized" });
        }
      }
    }
    else {
      newUser = await db.collection("users").insertOne(req.body);
      return res.status(200).json({ status: 200, data: newUser });
    }

    res.status(404).json({ status: 404, message: "Not found!" });
  }
  catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
  finally {
    //Close client
    client.close();
    console.log("disconnected!");
    //Close client

  }
};

const getUser = async (req, res) => {
  const { sub } = req.params;
  const query = { sub };
  try {
    const user = await mongoReadOne("users", query);
    user ?
      res.status(200).json({ status: 200, data: user }) :
      res.status(404).json({ status: 404, message: "Not found!" });
  }
  catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};



module.exports = { authorizeUser, getUser };