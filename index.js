const express = require("express");
const env = require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");

const mongoose = require("./src/config/db");
const authRouter = require("./src/router/authRouter");
const expenseRouter = require("./src/router/expenseRouter");
const incomeRouter = require("./src/router/IncomeRoter");
const reportRouter = require("./src/router/reportsRouter");
const budgetRouter = require("./src/router/bugetRouter");
app.use(cors());
app.use(express.static(path.join(__dirname, "/src/public")));
app.use(express.static(path.join(__dirname, "src/frontend")));
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", expenseRouter);
app.use("/api", incomeRouter);
app.use("/api", reportRouter);
app.use("/api", budgetRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "src/frontend/", "index.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/frontend/", "login.html"));
});

const port = process.env.PORT_NO || 3000;
app.listen(port, () => {
  console.log(`Server is running on Port no ${port}`);
});
