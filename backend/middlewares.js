function requireLogin(req, res, next) {
    if (req.session && req.session.isLoggedIn) {
      next();
    } else {
      res.status(401).json({ error: true, message: "Unauthorized" });
    }
  }

  module.exports = {
    requireLogin,
};