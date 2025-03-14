const Expense = require("../../model/Expense");
const Income = require("../../model/Income");
const getMonthlyReport = async (req, res) => {
  try {
    const { year } = req.params;

    if (!year) {
      return res.status(400).json({ message: "Year is required" });
    }

    const monthlyIncome = await Income.aggregate([
      {
        $match: {
          user: req.user._id,
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${+year + 1}-01-01`),
          },
        },
      },
      { $group: { _id: { $month: "$date" }, total: { $sum: "$amount" } } },
      { $sort: { _id: 1 } },
    ]);
    const monthlyExpense = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${+year + 1}-01-01`),
          },
        },
      },
      { $group: { _id: { $month: "$date" }, total: { $sum: "$amount" } } },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      monthlyIncome,
      monthlyExpense,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly report", error });
  }
};

module.exports = getMonthlyReport;
