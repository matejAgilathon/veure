const { User, BlacklistedToken } = require("../models");
const jwt = require("jsonwebtoken");

const sessionValidation = async (req, res) => {
  try {
    const { userId } = req.body;
    const token =  req.cookies.token
    if (!token || !userId || userId !== "null" || userId !== "undefined")
      return res.status(401).json({ success: false, err });
    const blacklistedToken = await BlacklistedToken.findOne({
      where: {
        value: token,
      },
    });
    if (blacklistedToken) {
      return res.redirect("http://localhost:8080/#/login");
    }
    jwt.verify(token, process.env.SESSION_SECRET, async (err, decoded) => {
      if(err) {
        const user = await User.findByPk(Number(userId));
        if(!user) return res.status(401).json({ success: false, err }); 
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