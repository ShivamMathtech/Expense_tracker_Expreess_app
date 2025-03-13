const BlacklistedToken = require("../../model/BlackListToken");
const logOutCtrls = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Invalid token format." });
    }

    const tokenValue = token.split(" ")[1]; // Extract token after "Bearer"
    // Store the token in the blacklist
    await BlacklistedToken.create({ token: tokenValue });

    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({
      msg: "Inernal Server Error",
      error: error.message,
    });
  }
};

module.exports = logOutCtrls;
