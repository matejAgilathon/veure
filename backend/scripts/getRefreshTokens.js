//get all the refresh tokens
const db = require("../models/index.js");

(async () => {
  try {
    console.dir(await db.refresh_token.findAll());
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
})();

