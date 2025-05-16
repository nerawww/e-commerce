// Middleware pour vérifier si l'utilisateur est administrateur

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access refusé. Droits d'administrateur requis",
    });
  }
  next();
};

module.exports = isAdmin;
