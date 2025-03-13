const Budget = require("../../model/budget");
const Expense = require("../../model/Expense");
const getBudgetStatus = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });

    const budgetStatus = await Promise.all(
      budgets.map(async (budget) => {
        const totalSpent = await Expense.aggregate([
          { $match: { user: req.user.id, category: budget.category } },
          { $group: { _id: "$category", total: { $sum: "$amount" } } },
        ]);

        const spent = totalSpent[0]?.total || 0;
        const remaining = budget.limit - spent;

        return {
          category: budget.category,
          limit: budget.limit,
          spent,
          remaining,
          exceeded: remaining < 0,
        };
      })
    );

    res.status(200).json(budgetStatus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching budget status", error });
  }
};

module.exports = getBudgetStatus;
