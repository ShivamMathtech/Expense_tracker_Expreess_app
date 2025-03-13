const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const setBudget = require("../controller/budgetCtrls/setbuddetctrls");
const getBudgets = require("../controller/budgetCtrls/getbudgetCtrls");
const getBudgetStatus = require("../controller/budgetCtrls/getbudgetStatus");
const updateBudget = require("../controller/budgetCtrls/updateBudget");
const budgetRouter = express.Router();
budgetRouter.get("/budget", authMiddleware, getBudgets);
budgetRouter.post("/budget", authMiddleware, setBudget);
budgetRouter.get("/budget/status", authMiddleware, getBudgetStatus);
// budgetRouter.delete("/budget/:id", authMiddleware, async (req, res) => {});
budgetRouter.put("/budget/:id", authMiddleware, updateBudget);

module.exports = budgetRouter;
