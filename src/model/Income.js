const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  source: {
    type: String,
    required: true,
    enum: ["Salary", "Freelance", "Business", "Investment", "Gift", "Others"],
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
  },
});

const Income = mongoose.model("Income", IncomeSchema);
module.exports = Income;
