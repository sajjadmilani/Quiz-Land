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
  console.log(req);
  console.log(socket.id);
  const { joinCode } = req;
  const resultData = await mongoReadOne("results", { joinCode });
  const query = { joinCode, "players.socketId": socket.id };
  const newValues = { $set: { "players.$.name": req.name } };
  await mongoUpdateOne("results", query, newValues);
  socket.join(joinCode);
  await updateLanding(req, socket);
  socket.emit("wait", { data: resultData });



};

module.exports = {
  setName
};