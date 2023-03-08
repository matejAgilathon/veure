const { RefreshToken } = require("../models/index.js");

const insertToken = async (userID, tokenString) => {
  try {
    return await RefreshToken.create({
      value: tokenString,
      userId: userID,
    });
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
}

module.exports = { insertToken };