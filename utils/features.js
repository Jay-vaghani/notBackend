const jwt = require("jsonwebtoken");

console.log(process.env.NODE_ENV === "Development");

module.exports.sendCookies = async (user, res, message, statusCode = 200) => {
  const token = await jwt.sign({ _id: user._id }, process.env.TOKEN);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: false,
      maxAge: 5 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      user,
    });
};
