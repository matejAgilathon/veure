const { Router } = require("express");
const { getConnections } = require("../../controllers/getConnections");

const router = Router();

router.get("/", getConnections);
router.get("/:id", getConnections);
// router.post("/", connectRequest);

module.exports = router;