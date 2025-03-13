const Expense = require("../../model/Expense");
const getAllExpenses = async (req, res) => {
  try {
    const userId = req.user._id;

    const expense = await Expense.find({ user: userId }).sort({ date: -1 });

    if (!expense) {
      return res.status(404).json({
        msg: "Expense not found",
      });
    }
    res.status(200).json({
      msg: "All Expenses",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server Error, try after some time",
      error: error.message,
    });
  }
};

module.exports = getAllExpenses;
