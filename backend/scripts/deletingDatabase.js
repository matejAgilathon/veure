const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("example_db", "example_user", "example_password", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .drop()
  .then(() => {
    console.log("Database dropped successfully");
  })
  .catch((error) => {
    console.error("Error dropping database:", error);
  });
