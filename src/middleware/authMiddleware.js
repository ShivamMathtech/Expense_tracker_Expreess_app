const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const User = require("../model/userModel");
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({
      msg: "Access denied. Invalid token format.",
    });
  }
  try {
    const tokenValue = token.split(" ")[1]; // Extract the token Value
    // Verify the token value
    // console.log(tokenValue); for tsting
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);
    // now after verify the token we will find the user into the database
    console.log(decoded);
    req.user = await User.findById(decoded.user).select("-password");
    // console.log(user);
    // console.log(req.user);
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "User not found. Invalid token." });
    }

    // req.user = user; // Attach the user object to request
    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
