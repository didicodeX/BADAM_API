export const authorize = (...allowRoles) => {
  return (req, res, next) => {
    console.log("req.user dans authorize:", req.user);
    const user = req.user;
    const hasRole = user.roles.some((role) => allowRoles.includes(role));

    if (!hasRole) {
      res.status(403).json({ error: "Acces interdit" });
    }
    next();
  };
};
                                         
