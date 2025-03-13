const express = require("express");
const registerCtrls = require("../controller/authCtrls/registerCtrl");
const loginCtrls = require("../controller/authCtrls/loginCtrls");
const authMiddleware = require("../middleware/authMiddleware");
const getProfile = require("../controller/authCtrls/getUserprofile");
const logOutCtrls = require("../controller/authCtrls/logoutCtrls");
const authRouter = express.Router();
authRouter.post("/auth/register", registerCtrls);
authRouter.post("/auth/login", loginCtrls);
authRouter.post("/auth/logout", authMiddleware, logOutCtrls);
authRouter.get("/auth/user", authMiddleware, getProfile);
authRouter.post("/auth/forget-passowrd/:id", async (req, res) => {});
authRouter.post("/auth/rest-passowrd/:id", async (req, res) => {});

module.exports = authRouter;
