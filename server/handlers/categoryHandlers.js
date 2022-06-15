const { mongoRead } = require('../dbHelpers');

//Get all categories
const getCategories = async (req, res) => {
  const categories = await mongoRead("categories");

  res.status(200).json({
    status: 200, data: categories
  });
};

module.exports = { getCategories };