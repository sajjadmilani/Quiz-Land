const { ObjectId } = require('mongodb');
const { mongoCreate, mongoRead, mongoReadOne, mongoReadLimit } = require('../dbHelpers');


const authorizUser = async (req, res) => {
  const { _id } = req.body;
  const query = { _id: ObjectId(_id) };
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

const getUser = async (req, res) => {
  const _id = req.params._id;
  const query = { _id: ObjectId(_id) };
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



module.exports = { authorizUser, getUser };