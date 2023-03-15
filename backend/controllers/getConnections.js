const { User } = require("../models");

const getConnections = async (req, res) => {
  const { type } = req.query;
  try {
    if (type !== "old" && type !== "new") return res.status(400).json({ success: false, err: "Bad request" });
    if (type === "old") {
      const dummyUsers = [
        {
          id: 8798,
          username: "Mate Matic",
          picture:
            "https://pbs.twimg.com/profile_images/1535659158523068419/K4tLjf8C_400x400.jpg",
        },
        {
          id: 8333,
          username: "Ante Antic",
          picture:
            "https://vignette.wikia.nocookie.net/disney/images/9/90/Pirates4JackSparrowPosterCropped.jpg/revision/latest?cb=20151120172626",
        },
        {
          id: 13233,
          username: "Matija Matko",
          picture:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Robert_Downey%2C_Jr._2012.jpg/1200px-Robert_Downey%2C_Jr._2012.jpg",
        },
      ];
      res.json(dummyUsers)
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