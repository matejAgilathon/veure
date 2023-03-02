const db = require("../models");

const insertUser = async (userData) => {
  try {
    const { username, email, picture, serviceProvider } = userData;
    return await db.user.create({
      username,
      email,
      picture,
      serviceProvider,
    });
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
};

module.exports = { insertUser };
