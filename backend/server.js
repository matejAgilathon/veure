require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");
const cron = require("node-cron");
const { clearAccessTokensBlacklist } = require("./jobs/clearAccessTokensBlacklist");
const api = require("./routes/api");

//middleware
app.use(express.json());
app.use(cors());
app.use("/api", api)

//cron job to clear the blacklist every 30 seconds
cron.schedule("*/30 * * * * *", () => {
  console.log("running a task every 30 seconds");
  clearAccessTokensBlacklist();
});

db.sequelize.sync().then((req) => {
  app.listen(8000, () => {
    console.log("Server started on port 8000");
  } );
});
