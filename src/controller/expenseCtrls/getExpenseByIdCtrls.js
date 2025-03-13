const Expense = require("../../model/Expense");
const expenseGetByIdCtrls = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};
module.exports = expenseGetByIdCtrls;
