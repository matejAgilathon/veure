const { User, BlacklistedToken } = require("../models");
const jwt = require("jsonwebtoken");

const sessionValidation = async (req, res) => {
  try {
    const { userId } = req.body;
    const token =  req.cookies.token
    if (!token || !userId || userId === "null" || userId === "undefined")
      return res.status(401).json({ success: false, err });
    const blacklistedToken = await BlacklistedToken.findOne({
      where: {
        value: token,
      },
    });
    if (blacklistedToken) {
      return res.redirect("http://localhost:8080/#/login");
    }
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    if(!decoded) return res.status(401).json({ success: false, err });
    const { userPhotoUrl, username, userId: id } = decoded;
    res.status(200).json({ userPhotoUrl, username, userId: id });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, err });
  }
}

module.exports = { sessionValidation };