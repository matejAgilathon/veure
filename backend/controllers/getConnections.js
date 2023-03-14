const getConnections = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(`unhandled error ` + err);
  }
};

module.exports = { getConnections };