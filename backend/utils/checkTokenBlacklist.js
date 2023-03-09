const { User } = require("../models");

const checkTokenBlacklist = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //get the user email from request
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email
      },
    });
    const blacklistedTokenList = await user.getBlacklistedTokens({
      where: {
        value: token,
      },
    });
    const blacklistedToken = blacklistedTokenList && blacklistedTokenList[0];
    if (blacklistedToken) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { checkTokenBlacklist };