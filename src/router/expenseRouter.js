const express = require("express");
const addExpenseCtrls = require("../controller/expenseCtrls/addExpense");
const authMiddleware = require("../middleware/authMiddleware");
const getAllExpenses = require("../controller/expenseCtrls/getAllexpenses");
const expenseGetByIdCtrls = require("../controller/expenseCtrls/getExpenseByIdCtrls");
const updateExpenseCtrls = require("../controller/expenseCtrls/updateExpenseCtrls");
const deleteExpenseByIdCtrls = require("../controller/expenseCtrls/deleteExpenseCtrls");
const expenseRouter = express.Router();
expenseRouter.get("/expenses", authMiddleware, getAllExpenses);
expenseRouter.get("/expenses/:id", authMiddleware, expenseGetByIdCtrls);
expenseRouter.post("/expenses", authMiddleware, addExpenseCtrls);
expenseRouter.put("/expenses/:id", authMiddleware, updateExpenseCtrls);
expenseRouter.delete("/expenses/:id", authMiddleware, deleteExpenseByIdCtrls);

module.exports = expenseRouter;
