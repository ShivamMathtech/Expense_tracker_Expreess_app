const Budget = require("../../model/budget");
const updateBudget = async (req, res) => {
  try {
    const { id } = req.params; // Get budget ID from URL params
    const { newLimit } = req.body;

    // Find the budget by ID and ensure it belongs to the authenticated user
    let budget = await Budget.findOne({ _id: id, user: req.user.id });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Update the budget limit
    budget.limit = newLimit;
    await budget.save();

    res.status(200).json({ message: "Budget updated successfully", budget });
  } catch (error) {
    res.status(500).json({ message: "Error updating budget", error });
  }
};

module.exports = updateBudget;
