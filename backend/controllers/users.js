//controlers for user

const db = require("../models");
// const { verifyToken, encode } = require("../utils/verifyToken");
// const { Op } = require("sequelize");
// const { User } = db.sequelize.models;

// const createUser = async (req, res) => {
//   try {
//     const { username, email, picture, serviceProvider } = req.body;
//     const user = await User.create({
//       username,
//       email,
//       picture,
//       serviceProvider,
//     });
//     res.send(user);
//   } catch (err) {
//     console.log(`unhandled error ` + err);
//   }
// };

const getUsers = async (req, res) => {
  try {
    const users = await db.user.findAll();
    res.json(users);
    console.log(users);
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
};

module.exports = { getUsers };