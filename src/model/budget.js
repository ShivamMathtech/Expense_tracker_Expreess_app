const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  limit: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Budget = mongoose.model("Budget", BudgetSchema);

module.exports = Budget;
