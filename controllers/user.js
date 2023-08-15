const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { sendCookies } = require("../utils/features.js");
const ErrorHandler = require("../middleware/error.js");


module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.json({
        success: false,
        message: "User Exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12, process.env.password);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookies(user, res, "User Created", 201);
  } catch (error) {
    next(error)
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User not found", 404))
    }

    const compere = await bcrypt.compare(password, user.password);

    if (!compere) {
      return next(new ErrorHandler("Invalid Credential", 404))
    }

    sendCookies(user, res, `Welcome Back ${user.name}`, 200);
  } catch (error) {
    next(error)
  }
};

module.exports.getMyProfile = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

module.exports.logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true
  })
    .json({
      success: true,
      message: "User Logout",
    });
};
