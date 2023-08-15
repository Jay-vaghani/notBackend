const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login First ",
    });
  }

  const { _id } = jwt.verify(token, process.env.TOKEN);

  req.user = await User.findById(_id);

  next();
};
