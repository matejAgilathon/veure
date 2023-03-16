const { User, Connection } = require("../../models");

const connectRequest = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    const user = await User.findByPk(Number(userId));
    const connection = await User.findByPk(Number(id));
    if (!user || !connection) {
      return res.status(404).json({ success: false, err: "User not found" });
    }
    const connectionRequest = await Connection.create({
      userId: Number(userId),
      connectionId: Number(id),
    });
    // const connectionRequest = await user.createConnection({
    //   connectionId: Number(id),
    // });
    res.status(201).json({ success: true, connectionRequest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
}

module.exports = { connectRequest };