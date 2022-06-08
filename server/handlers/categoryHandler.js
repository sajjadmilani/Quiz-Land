const getCategories = async (req, res) => {

  res.status(200).json({
    status: 200, data: [
      "Arts & Literature",
      "Film & TV",
      "Food & Drink",
      "General Knowledge",
      "Geography",
      "History",
      "Music",
      "Science",
      "Society & Culture",
      "Sport & Leisure",
      "Others"
    ]
  });
};

module.exports = { getCategories };