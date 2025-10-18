export const protect = (req, res, next) => {
  // TODO: Add JWT auth logic
    next();
};

export const adminOnly = (req, res, next) => {
  // TODO: Restrict to admin users
    next();
};
