const Income = require("../../model/Income");
const deleteIncomeCtrls = async (req, res) => {
  try {
    const incomeId = req.params.id;
    let income = await Income.findByIdAndDelete({
      user: req.user._id,
      _id: incomeId,
    });
    if (!income) {
      return res.status(404).json({
        msg: "Income not Found",
      });
    }
    res.status(200).json({
      msg: "Income deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error ",
      error: error.message,
    });
  }
};

module.exports = deleteIncomeCtrls;
