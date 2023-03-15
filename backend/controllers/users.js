//controlers for user
const jwt = require("jsonwebtoken");
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
    //unpack teh cookie
    // const { token } = req.cookies;
    const { userId } = req.cookies;
    //verify the token
    // const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    // const { userId } = decoded;
    const users = await User.findAll(
      // {
      // attributes: ["id", "username", "picture"],
    // }
    );
    console.log(users);
    const filteredUsers = users.filter((user) => user.id !== userId)
    res.json(filteredUsers);
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
};

module.exports = { getUsers };