// Fonctions utilitaires pour la gestion des utilisateurs (lecture, écriture, création avec UUID et rôle)

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Chemin du fichier JSON contenant les utilisateurs
const userDB = "./db/users.json";

// Lit et retourne la liste des utilisateurs depuis le fichier JSON
const readUsers = () => {
  try {
    if (fs.existsSync(userDB)) {
      const data = fs.readFileSync(userDB, "utf-8");
      return data ? JSON.parse(data) : [];
    }
    return [];
  } catch (error) {
    console.error("Erreur lors de la lecture des utilisateurs :", error);
    return [];
  }
};

// Écrit la liste des utilisateurs dans le fichier JSON
const writeUsers = (users) => {
  try {
    fs.writeFileSync(userDB, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error(
      "Erreur lors de l'écriture des utilisateurs dans la base de données :",
      error
    );
  }
};

// Ajoute un utilisateur avec un rôle (par défaut "client") et un UUID
const createUserRoleBased = (userData, role = "client") => {
  const user = {
    id: uuidv4(),
    ...userData,
    role,
  };

  const usersList = readUsers();
  usersList.push(user);
  writeUsers(usersList);
  return user;
};

module.exports = {
  readUsers,
  writeUsers,
  createUserRoleBased,
};
