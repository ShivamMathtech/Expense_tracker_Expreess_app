const Expense = require("../../model/Expense");
const Budget = require("../../model/budget");
const addExpenseCtrls = async (req, res) => {
  try {
    const { category, amount } = req.body;

    const budget = await Budget.findOne({ user: req.user._id, category });

    if (budget) {
      const totalSpent = await Expense.aggregate([
        { $match: { user: req.user._id, category } },
        { $group: { _id: "$category", total: { $sum: "$amount" } } },
      ]);

      const spent = totalSpent[0]?.total || 0;
      const newTotal = spent + amount;

      if (newTotal > budget.limit) {
        return res
          .status(400)
          .json({ message: `Budget exceeded for ${category}` });
      }
    }

    const expense = await Expense.create({
      user: req.user._id,
      category,
      amount,
    });
    res.status(201).json({ message: "Expense added", expense });
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error });
  }
};

module.exports = addExpenseCtrls;
