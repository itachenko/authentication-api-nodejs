const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).send("Access denied!");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.data = data;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
}

module.exports = verifyToken;
