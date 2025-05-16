// Définition des routes pour l'authentification des utilisateurs

const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authControllers");

const authRoute = express.Router();

// Route POST pour l'inscription d'un utilisateur
authRoute.post("/register", registerUser, loginUser);
// Route POST pour la connexion d'un utilisateur
authRoute.post("/login", loginUser);
// Route POST pour la déconnexion d'un utilisateur
authRoute.post("/logout", logoutUser);

module.exports = authRoute;
