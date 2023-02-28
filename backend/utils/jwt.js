const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    // The token is valid, save the decoded token for use in other routes
    req.decoded = decoded;
    next();
  });
}

function encode(body, expiration) {
  const token = jwt.sign(
    body,
    process.env.SESSION_SECRET,
    {
      expiresIn: expiration,
    }
  );
  return token;
}

module.exports = { verifyToken, encode };
