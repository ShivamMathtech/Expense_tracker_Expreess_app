const User = require("../../model/userModel");
const getProfile = async (req, res) => {
  try {
    const userId = req.user;
    let user = await User.findOne(userId);
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    res.status(200).json({
      msg: "user found",
      user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server Error",
      error: error.message,
    });
  }
};

module.exports = getProfile;
