const connectRequest = async (req, res) => {
  try {
    const { userId, connectionId } = req.body;
    const user = await User.findByPk(Number(userId));
    const connection = await User.findByPk(Number(connectionId));
    if (!user || !connection) {
      return res.status(404).json({ success: false, err: "User not found" });
    }
    const connectionRequest = await user.createConnectionRequest({
      connectionId: Number(connectionId),
    });
    res.status(200).json({ success: true, connectionRequest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err });
  }
}

module.exports = { connectRequest };