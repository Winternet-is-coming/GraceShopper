const { models: User } = require("../db/models/User.js");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
  } catch (e) {
    next(e);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Permission denied");
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
