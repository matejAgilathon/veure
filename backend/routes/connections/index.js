const { Router } = require("express");
const { getConnections, connectRequest, acceptConnection, rejectConnection } = require("../../controllers/connections");

const router = Router();

router.get("/", getConnections);
router.get("/:id", getConnections);
router.post("/:id", connectRequest);
router.put("/:id", acceptConnection);
router.delete("/:id", rejectConnection);

module.exports = router;