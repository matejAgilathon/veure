const { User, Op } = require("../../models");

const getConnections = async (req, res) => {
  const { userId } = req.cookies;
  const { type } = req.query;

  try {
    if (!userId)
      return res.status(401).json({ success: false, err: "Unauthorized" });

    if (!type && req.params.id) {
      const user = await User.findOne({
        where: { id: req.params.id },
        attributes: ["id", "username", "picture"],
      });

      if (!user)
        return res.status(404).json({ success: false, err: "User not found" });

      return res.json(user);
    }

    const user = await User.findByPk(req.params.id);

    if (!user)
      return res.status(404).json({ success: false, err: "User not found" });

    if (type === "old") {
      const connections = await user.getConnections({
        where: { status: "connected" },
      });
      const users = await Promise.all(
        connections.map(async (connection) => {
          const user = await connection.getUser();
          return user;
        })
      );

      res.json(users);
    } else if (type === "new") {
      const users = await User.findAll({
        where: { [Op.not]: { id: Number(userId) } },
      });
      res.json(users);
    } else if (type === "requests") {
      const requests = await user.getConnections({
        where: { status: "requested" },
      });
      const users = await Promise.all(
        requests.map(async (request) => {
          const user = await request.getFromUser();
          return user;
        })
      );

      res.json(users);
    } else {
      return res.status(400).json({ success: false, err: "Bad request" });
    }
  } catch (err) {
    console.log(`unhandled error ${err}`);
  }
};

module.exports = { getConnections };
