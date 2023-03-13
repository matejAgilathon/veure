//this controller deletes the refresh token and invalidates access tokens on logout
const { RefreshToken, User } = require("../models");

const logout = async (req, res) => {
  try {
    const { userId, accessToken } = req.body;

    const httpCookie = req.cookies.testCookie;
    // console.log("req.headers", req.headers);
    console.log("httpCookie", httpCookie)

    const user = await User.findOne({
      where: {
        id: Number(userId),
      },
    });
    // invalidate the token from the body by placing it inside the blacklist
    await user.createBlacklistedToken({ value: accessToken });

    // delete the refresh token
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