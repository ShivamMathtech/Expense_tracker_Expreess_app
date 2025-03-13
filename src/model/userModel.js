const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
  income: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Income",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
