//this controller deletes the refresh token and invalidates access tokens on logout
const { RefreshToken, User } = require("../models");
const jwt = require("jsonwebtoken");

const logout = async (req, res) => {
  try {
    const { token } = req.body;
    // get the email from the decoded token
    const { email } = jwt.verify(token, process.env.SESSION_SECRET);
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const refreshToken = await RefreshToken.findOne({
      where: {
        userId: user.id,
      },
    });
    if(refreshToken) {
      await refreshToken.destroy();
      res.status(204).json({ success: true });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
}

module.exports = { logout };