const db = require("../models/index.js");

const insertToken = async (userID, tokenString) => {
  try {
    return await db.refresh_token.create({
      value: tokenString,
      userId: userID,
    });
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
}

module.exports = { insertToken };