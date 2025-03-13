const express = require("express");
const env = require("dotenv").config();
const app = express();
const mongoose = require("./src/config/db");
const authRouter = require("./src/router/authRouter");
const expenseRouter = require("./src/router/expenseRouter");
const incomeRouter = require("./src/router/IncomeRoter");
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", expenseRouter);
app.use("/api", incomeRouter);
const port = process.env.PORT_NO || 3000;
app.listen(port, () => {
  console.log(`Server is running on Port no ${port}`);
});
