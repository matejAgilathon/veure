const { Router } = require("express");
const router = Router();
const { authThroughGoogle } = require("../controllers/googleAuth");
const { logout } = require("../controllers/logout");
const { verifyToken } = require("../utils/jwt");
const { sessionValidation } = require("../controllers/sessionValidation");
const { getConnections } = require("../controllers/getConnections");
const { connectRequest } = require("../controllers/connectRequest");
const connectionsRouter = require("./connections");

//controllers
const { createUser, getUserByID, getUsers, deleteUser, updateUser } = require("../controllers/users");
const { checkTokenBlacklist } = require("../utils/checkTokenBlacklist");

//routes
// router.get("/users", verifyToken, getUsers);
// router.get("/users/:id", verifyToken, getUserByID);
// router.delete("/users/:id", verifyToken, deleteUser);
// router.put("/users/:id", verifyToken, updateUser);

router.get("/sessions/oauth/google", authThroughGoogle);

router.post("/testToken", verifyToken, checkTokenBlacklist, (req, res) => {
  res.json({ success: true });
});

router.get("/users", getUsers);

router.post("/session/validation", sessionValidation);

router.use("/connections", verifyToken, connectionsRouter);

router.post("/logout", logout);

module.exports = router;