//get all the refresh tokens
const { RefreshToken } = require("../models/index.js");

(async () => {
  try {
    console.log(await RefreshToken.findAll());
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
})();
