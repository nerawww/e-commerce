// Importe bcrypt pour le hachage des mots de passe et jwt pour la gestion des tokens
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Importe les fonctions utilitaires pour la gestion des utilisateurs
const {
  readUsers,
  writeUsers,
  createUserRoleBased,
} = require("../utils/userUtils");

const JWT_SECRET = "DWFS"; // À sécuriser dans un fichier .env en production

// Contrôleur pour l'inscription d'un nouvel utilisateur
const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log("Donnée reçue: ", req.body);

    const users = readUsers();

    // Vérifie si l'utilisateur existe déjà
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return res.status(400).json({
        message: "Utilisateur déjà existant.",
      });
    }

    // Hache le mot de passe avant de le sauvegarder
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crée un nouvel utilisateur avec le mot de passe haché
    const newUser = createUserRoleBased(
      {
        username,
        password: hashedPassword,
      },
      role
    );

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({
      message: "Utilisateur créé avec succès.",
    });
  } catch (error) {
    // Gestion des erreurs lors de l'inscription
    console.error("Erreur lors de l'enregistrement :", error);

    res.status(500).json({
      message: "Erreur du serveur lors de l'enregistrement.",
      error: error.message,
    });
  }
};

// Contrôleur pour la connexion d'un utilisateur
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const users = readUsers();
    const user = users.find((u) => u.username === username);

    if (!user)
      return res.status(404).json({
        message: "Utilisateur non trouvé.",
      });

    // Vérifie la correspondance du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({
        message: "Mot de passe invalide.",
      });

    // Génère un token JWT pour l'utilisateur
    const token = jwt.sign(
      { username: user.username, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Envoie le token dans un cookie sécurisé
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.json({
      message: "Connexion réussie.",
      token,
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({
      message: "Erreur du serveur lors de la connexion.",
    });
  }
};

const logoutUser = (req, res) => {
  // Déconnexion en supprimant le cookie
  res.clearCookie("token", {
    httpOnly: true, // Empêche l'accès à JavaScript
    sameSite: "Strict", // Empêche le cookie d'être envoyé avec des requêtes cross-origin (CSRF)
    path: "/", // Le chemin est paramétré à la racine
  });

  res.status(200).json({
    message: "Déconnexion réussie",
  });
};

// Exporte les contrôleurs pour l'authentification
module.exports = { registerUser, loginUser, logoutUser };
