const { getConnections } = require("./getConnections.js");
const { connectRequest } = require("./connectRequest.js");
const { acceptConnection } = require("./acceptConnection.js");
const { rejectConnection } = require("./rejectConnection.js");

module.exports = {
  getConnections,
  connectRequest,
  acceptConnection,
  rejectConnection,
};
