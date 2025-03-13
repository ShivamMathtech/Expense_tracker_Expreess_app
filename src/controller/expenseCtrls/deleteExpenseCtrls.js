const Expense = require("../../model/Expense");
const deleteExpenseByIdCtrls = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense) {
      return res
        .status(404)
        .json({ message: "Expense not found or not authorized." });
    }

    res.status(200).json({ message: "Expense deleted successfully." });
  } catch (error) {
    res.status(500).json({
      msg: "Inernal Server error",
      error: error.message,
    });
  }
};
module.exports = deleteExpenseByIdCtrls;
