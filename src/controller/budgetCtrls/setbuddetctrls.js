const Budget = require("../../model/budget");
const Expense = require("../../model/Expense");
const setBudget = async (req, res) => {
  try {
    const { category, limit } = req.body;

    let budget = await Budget.findOne({ user: req.user._id, category });

    if (budget) {
      budget.limit = limit; // Update existing budget
      await budget.save();
    } else {
      budget = await Budget.create({ user: req.user.id, category, limit });
    }

    res.status(200).json({ message: "Budget set successfully", budget });
  } catch (error) {
    res.status(500).json({ message: "Error setting budget", error });
  }
};

module.exports = setBudget;
