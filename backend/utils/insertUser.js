const db = require("../models");

const insertUser = async (userData) => {
  try {
    const { username, email, picture, serviceProvider } = userData;
    const user = await db.user.create({
      username,
      email,
      picture,
      serviceProvider,
    });
    console.log("user created successfully: ", user);
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
};

module.exports = { insertUser };
