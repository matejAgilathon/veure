module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("users", {
      fields: ["email"],
      type: "unique",
      name: "unique_email_constraint"
    });
  }
}