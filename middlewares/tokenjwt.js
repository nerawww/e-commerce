const jwt = require("jsonwebtoken");

// Clé secrète JWT (à placer dans un fichier .env en production)
const JWT_SECRET = "DWFS";

// Middleware pour vérifier l'authentification JWT via le cookie
const authenticateJWT = (req, res, next) => {
  // Récupère le token JWT depuis le cookie
  const token = req.cookies["token"];
  if (!token) {
    return res.status(403).json({
      message: "Token non fourni.",
    });
  }

  // Vérifie la validité du token
  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({
        message: "Token expiré ou non valide.",
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticateJWT;
