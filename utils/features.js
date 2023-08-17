const jwt = require("jsonwebtoken");


module.exports.sendCookies = async (user, res, message, statusCode = 200) => {
  const token = await jwt.sign({ _id: user._id }, process.env.TOKEN);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
      user,
    });
};
