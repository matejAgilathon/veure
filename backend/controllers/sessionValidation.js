const { User, BlacklistedToken } = require("../models");
const jwt = require("jsonwebtoken");

const sessionValidation = async (req, res) => {
  try {
    const { token, userId } = req.body;
    const blacklistedToken = await BlacklistedToken.findOne({
      where: {
        value: token,
      },
    });
    // const blacklistedToken = blacklistedTokenList && blacklistedTokenList[0];
    if (blacklistedToken) {
      return res.redirect("http://localhost:8080/#/login");
    }
    jwt.verify(token, process.env.SESSION_SECRET, async (err, decoded) => {
      if(err) {
         //create new token and return data about user
        const user = await User.findByPk(Number(userId));
        const { userPhotoUrl, username, id } = user.dataValues;
        const accessToken = jwt.sign({ userPhotoUrl, username, id }, process.env.SESSION_SECRET, { expiresIn: "30s" });
        res.cookie("accessToken", accessToken);
        res.status(200).json({ userPhotoUrl, username, id });
      }
      res.status(200).json({ userPhotoUrl: decoded.userPhotoUrl, username: decoded.username, id: decoded.id });
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, err });
  }
}

module.exports = { sessionValidation };