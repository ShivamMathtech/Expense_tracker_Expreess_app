const User = require("../../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const env = require("dotenv").config();
const registerCtrls = async (req, res) => {
  try {
    const { first_name, last_name, password, email } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        msg: "User Already Exist",
      });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({
      first_name: first_name,
      last_name: last_name,
      password: hashedPassword,
      email: email,
    });
    await user.save();
    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(201).json({
      msg: "User is registered Successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = registerCtrls;
