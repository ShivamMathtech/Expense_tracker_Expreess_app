const Income = require("../../model/Income");
const addIncomeCtrls = async (req, res) => {
  try {
    const { amount, source, description } = req.body;
    if (!amount || !source) {
      return res
        .status(400)
        .json({ message: "Amount and source are required." });
    }
    const newIncome = new Income({
      user: req.user._id,
      amount,
      source,
      description,
    });
    await newIncome.save();
    res.status(201).json({
      msg: "Income Added Successfully",
      newIncome,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error, try again !! after some time",
      error: error.message,
    });
  }
};

module.exports = addIncomeCtrls;
