const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { mongoReadOne, mongoUpdateOne } = require('../dbHelpers');
const { updateLanding } = require('./organizerHandlers');



const setName = async (req, socket) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
    //Connect client
    await client.connect();
    console.log("connected!");
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries

    const { joinCode } = req;
    const resultData = await db.collection("results").findOne({ joinCode });
    const query = { joinCode, "players.socketId": socket.id };
    const newValues = { $set: { "players.$.name": req.name } };
    await db.collection("results").updateOne(query, newValues);
    socket.join(joinCode);
    await updateLanding(req, socket);
    socket.emit("wait", { data: resultData });
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

module.exports = {
  setName
};