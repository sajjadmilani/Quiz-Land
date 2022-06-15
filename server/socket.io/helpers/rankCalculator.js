const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Calculate rank of all users after each score update
const rankCalculator = async (resultId) => {
  const client = new MongoClient(MONGO_URI, options);
  try {

    //Connect client
    await client.connect();
    const db = client.db(DB_NAME);
    //Connect client
    //------------------------------------------------------------------------------------------
    //Queries
    const resultData = await db.collection("results").findOne({ _id: resultId });
    let players = [...resultData.players];
    if (players.length >= 1) {
      //Sort players by points
      players.sort((a, b) => b.points - a.points);
      //Update rank of players in array
      const newPlayers = players.map((player, index) => {
        if (player.points > 0) {
          return { ...player, rank: index + 1 };
        }
        else {
          return player;
        }
      });
      await db.collection("results").updateOne({ _id: resultId }, { $set: { players: newPlayers } });
    }
    return true;
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
module.exports = { rankCalculator };