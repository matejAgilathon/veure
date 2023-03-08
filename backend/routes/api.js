const { Router } = require("express");
const router = Router();
const { authThroughGoogle } = require("../controllers/googleAuth");
const { logout } = require("../controllers/logout");
const { verifyToken } = require("../utils/jwt");

//controllers
const { createUser, getUserByID, getUsers, deleteUser, updateUser } = require("../controllers/users");

//routes
// router.get("/users", verifyToken, getUsers);
// router.get("/users/:id", verifyToken, getUserByID);
// router.delete("/users/:id", verifyToken, deleteUser);
// router.put("/users/:id", verifyToken, updateUser);

router.get("/sessions/oauth/google", authThroughGoogle);

router.get("/testToken", verifyToken, (req, res) => {
  res.json({ success: true });
});

router.get("/users", getUsers);

router.post("/logout", logout);

module.exports = router;