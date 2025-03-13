const Expense = require("../../model/Expense");
const addExpenseCtrls = async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    if (!amount || !category) {
      return res
        .status(400)
        .json({ message: "Amount and category are required." });
    }
    const newExpense = new Expense({
      user: req.user._id, // From authMiddleware
      amount,
      category,
      description,
    });

    await newExpense.save();
    res
      .status(201)
      .json({ message: "Expense added successfully!", expense: newExpense });
  } catch (error) {
    res.status(500).json({
      msg: "Inernal Server Error",
      error: error.message,
    });
  }
};

module.exports = addExpenseCtrls;
