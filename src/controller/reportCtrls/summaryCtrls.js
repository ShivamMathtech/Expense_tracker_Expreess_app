const Expense = require("../../model/Expense");
const Income = require("../../model/Income");
const summaryCtrls = async (req, res) => {
  try {
    const totalIncome = await Income.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      netSavings: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching summary", error });
  }
};

module.exports = summaryCtrls;
