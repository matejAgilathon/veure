const { User, Connection } = require("../../models");

const acceptConnection = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    const user = await User.findByPk(Number(userId));
    const connection = await User.findByPk(Number(id));
    if (!user || !connection) {
      return res.status(404).json({ success: false, err: "User not found" });
    }
    const update = {
      status: "connected",
    };
    const where = {
      where: {
        userId: Number(id),
        connectionId: Number(userId),
      },
    };

    const connectionUpdateRequest = await Connection.update(update, where);
    res.status(204).json({ success: true, connectionUpdateRequest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
};

module.exports = { acceptConnection };
