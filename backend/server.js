require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const api = require("./routes/api");


const app = express();

app.use("/api", api)
app.use(express.json());
app.use(cors());

db.sequelize.sync().then((req) => {
  app.listen(8000, () => {
    console.log("Server started on port 8000");
  } );
});
