const { Router } = require("express");
const { getConnections, connectRequest } = require("../../controllers/connections");

const router = Router();

router.get("/", getConnections);
router.get("/:id", getConnections);
router.post("/:id", connectRequest);

module.exports = router;