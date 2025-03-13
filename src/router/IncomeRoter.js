const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const addIncomeCtrls = require("../controller/incomeCtrls/addIncomeCtrls");
const getAllIncome = require("../controller/incomeCtrls/getAllIncome");
const getIncomeByIdCtrls = require("../controller/incomeCtrls/getIncomeByIdCtrls");
const deleteIncomeCtrls = require("../controller/incomeCtrls/deleteIncomeByIdCtrls");
const updateIncome = require("../controller/incomeCtrls/updateIncomebyId");
const incomeRouter = express.Router();
incomeRouter.post("/income", authMiddleware, addIncomeCtrls);
incomeRouter.put("/income/:id", authMiddleware, updateIncome);
incomeRouter.delete("/income/:id", authMiddleware, deleteIncomeCtrls);
incomeRouter.get("/income/:id", authMiddleware, getIncomeByIdCtrls);
incomeRouter.get("/income", authMiddleware, getAllIncome);

module.exports = incomeRouter;
