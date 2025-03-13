const Income = require("../../model/Income");
const getIncomeByIdCtrls = async (req, res) => {
  try {
    const incomeId = req.params.id;
    let income = await Income.findOne({ user: req.user._id, _id: incomeId });
    if (!income) {
      return res.status(404).json({
        msg: "Income not found",
      });
    }
    res.status(200).json({
      msg: "Income found",
      income,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Inernal server Error",
      error: error.messgae,
    });
  }
};

module.exports = getIncomeByIdCtrls;
