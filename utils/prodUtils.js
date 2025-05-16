// Fonctions utilitaires pour la gestion des produits (lecture, écriture, création avec UUID)

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Chemin du fichier JSON contenant les produits
const filePath = "./db/products.json";

// Lit et retourne la liste des produits depuis le fichier JSON
const readDB = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }
  return [];
};

// Écrit la liste des produits dans le fichier JSON
const writeDB = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Crée un nouveau produit avec un identifiant unique et l'ajoute à la base
const createProductId = (prodData) => {
  const prod = {
    id: uuidv4(), // Génère un identifiant unique
    ...prodData,
  };

  const prodList = readDB();
  prodList.push(prod);
  writeDB(prodList);
  return prod;
};

module.exports = {
  readDB,
  writeDB,
  createProductId,
};
