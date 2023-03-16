const { User } = require("../../models");

const getConnections = async (req, res) => {
  const { userId } = req.cookies;
  const { type } = req.query;
  if (!type && req.params.id) {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: ["id", "username", "picture"],
    });
    if (!user)
      return res.status(404).json({ success: false, err: "User not found" });
    return res.json(user);
  }
  try {
    if (type !== "old" && type !== "new")
      return res.status(400).json({ success: false, err: "Bad request" });
    if (type === "old") {
      if (!userId)
        return res.status(401).json({ success: false, err: "Unauthorized" });
      const user = await User.finfByPk(req.params.id);
      if (!user)
        return res.status(404).json({ success: false, err: "User not found" });
      //get all the connections
      const connections = await user.getConnections({
        where: { status: "connected" },
      });
      //get all the users that have a connection with the user
      const users = await Promise.all(
        connections.map(async (connection) => {
          const user = await connection.getUser();
          return user;
        })
      );
      res.json(users);
    } else if (type === "new") {
      try {
        if (!userId)
          return res.status(401).json({ success: false, err: "Unauthorized" });
        const users = await User.findAll();
        const filteredUsers = users.filter(
          (user) => user.id !== Number(userId)
        );
        res.json(filteredUsers);
      } catch (err) {
        console.log(`unhandled error ` + err);
      }
    } else if (type === "requests") {
      try {
        if (!userId)
          return res.status(401).json({ success: false, err: "Unauthorized" });
        const user = await User.finfByPk(req.params.id);
        if (!user)
          return res
            .status(404)
            .json({ success: false, err: "User not found" });
        //get all the requests
        const requests = await user.getConnections({
          where: { status: "connected" },
        });
        //get all the users that sent the requests
        const users = await Promise.all(
          requests.map(async (request) => {
            const user = await request.getUser();
            return user;
          })
        );
        res.json(users);
      } catch (err) {
        console.log(`unhandled error ` + err);
      }
    }
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
};

module.exports = { getConnections };
