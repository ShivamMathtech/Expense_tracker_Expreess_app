const Income = require("../../model/Income");
const Expense = require("../../model/Expense");
const getCategoryWiseCtrls = async (req, res) => {
  try {
    const categoryExpenses = await Expense.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
    ]);

    res.status(200).json(categoryExpenses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching category-wise expenses", error });
  }
};

module.exports = getCategoryWiseCtrls;
