const Income = require("../../model/Income");
const updateIncome = async (req, res) => {
  try {
    const { amount, source, description } = req.body;
    const income = await Income.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { amount, source, description },
      { new: true }
    );

    if (!income) {
      return res
        .status(404)
        .json({ message: "Income not found or not authorized." });
    }

    res.status(200).json({ message: "Income updated successfully.", income });
  } catch (error) {
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

module.exports = updateIncome;
