// const db = require("../models");

// // db.sequelize
// //   .query("ALTER TABLE students ADD COLUMN phone VARCHAR(30) NOT NULL")
// //   .then(() => {
// //     console.log("Column added successfully!");
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });

// db.sequelize
//   .query("ALTER TABLE `users` ADD COLUMN username VARCHAR(30)")
//   .then(() => {
//     console.log("Column added successfully!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });


"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "username", {
      type: Sequelize.STRING(30),
      allowNull: true,
      unique: true,
    });
  },

  // down: async (queryInterface, Sequelize) => {
  //   await queryInterface.removeColumn("users", "username");
  // },
};
