const { User } = require("../../models");

const getConnections = async (req, res) => {
  const { type } = req.query;
  if (!type && req.params.id) {
    const user = await User.findOne({ 
      where: { id: req.params.id },
      attributes: ["id", "username", "picture"]
    });
    if (!user) return res.status(404).json({ success: false, err: "User not found" });
    return res.json(user);
  }
  try {
    if (type !== "old" && type !== "new") return res.status(400).json({ success: false, err: "Bad request" });
    if (type === "old") {
      res.json([])
    } else {
      (async () => {
        try {
          console.log(req)
          const { userId } = req.cookies;
          if (!userId) return res.status(401).json({ success: false, err: "Unauthorized" })
          const users = await User.findAll();
          const filteredUsers = users.filter((user) => user.id !== Number(userId));
          res.json(filteredUsers);
        } catch (err) {
          console.log(`unhandled error ` + err);
        }
      })();
    }
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
};

module.exports = { getConnections };