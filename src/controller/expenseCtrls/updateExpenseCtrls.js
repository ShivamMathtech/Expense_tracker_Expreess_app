const Expense = require("../../model/Expense");
const updateExpenseCtrls = async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { amount, category, description },
      { new: true }
    );

    if (!expense) {
      return res
        .status(404)
        .json({ message: "Expense not found or not authorized." });
    }

    res.status(200).json({ message: "Expense updated successfully.", expense });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = updateExpenseCtrls;
