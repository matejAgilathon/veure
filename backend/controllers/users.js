//controlers for user

const { User } = require("../models");
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
    const users = await User.findAll();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
};

module.exports = { getUsers };