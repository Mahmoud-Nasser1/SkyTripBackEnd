const jwt = require("jsonwebtoken");

const checkRole = (roleNeeded) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res
        .status(401)
        .json({ message: "Unauthorized missing role", data: null });
    }

    if (req.user.role !== roleNeeded) {
      return res.status(403).json({
        message: "You don't have the required role",
        data: null,
      });
    }

    next();
  };
};

module.exports = checkRole;
