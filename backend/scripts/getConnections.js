//get all the refresh tokens
const { Connection } = require("../models/index.js");

(async () => {
  try {
    console.log(await Connection.findAll());
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
})();
