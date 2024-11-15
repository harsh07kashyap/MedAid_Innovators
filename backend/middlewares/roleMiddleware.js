const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (req.user && allowedRoles.includes(req.user.type)) {
      next(); // User has an allowed role, proceed to the route handler
    } else {
      return res.status(403).json({ message: "Access forbidden: Insufficient privileges" });
    }
  };
};

export default roleMiddleware;
