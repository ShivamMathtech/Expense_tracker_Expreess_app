const User = require("../../model/userModel");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const bcrypt = require("bcryptjs");
const loginCtrls = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        msg: "Invalid User Email or Password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        msg: "Invalid User Email or Password",
      });
    }
    // If everything is fine then Genrate the User token
    const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).json({
      msg: "Login Successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = loginCtrls;
