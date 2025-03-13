const Income = require("../../model/Income");
const getAllIncome = async (req, res) => {
  try {
    const userId = req.user._id;
    let income = await Income.find({ user: userId });
    if (!income) {
      return res.status(404).json({
        msg: "No Income found",
      });
    }
    res.status(200).json({
      msg: "Income Found",
      income,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server Error !! try again Later",
      error: error.message,
    });
  }
};

module.exports = getAllIncome;
