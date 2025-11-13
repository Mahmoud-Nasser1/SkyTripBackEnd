const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const token = (
    req.header("Authorization") || req.header("authorization")
  )?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token Not Found",
      data: null,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({
      message: "Invalid token",
      data: null,
    });
  }
};

module.exports = checkLogin;
