const { User, Connection } = require("../../models");

const rejectConnection = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    const user = await User.findByPk(Number(userId));
    const connection = await User.findByPk(Number(id));
    if (!user || !connection) {
      return res.status(404).json({ success: false, err: "User not found" });
    }
    const connectionRejectRequest = await Connection.delete(
      {
        where: {
          userId: Number(id),
          connectionId: Number(userId),
        },
      }
    );
    res.status(204).json({ success: true, connectionRejectRequest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
};

module.exports = { rejectConnection };
