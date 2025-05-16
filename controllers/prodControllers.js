// Contrôleurs pour la gestion des produits (CRUD et notation)

const { readDB, writeDB, createProductId } = require("../utils/prodUtils");

// Récupère et retourne tous les produits, avec possibilité de filtrer via query string
const getAllProducts = (req, res) => {
  let products = readDB();
  const filters = req.query;

  // Applique les filtres dynamiquement sur chaque propriété passée en query
  for (let key in filters) {
    if (filters[key]) {
      products = products.filter(
        (product) =>
          product[key] &&
          product[key]
            .toString()
            .toLowerCase()
            .includes(filters[key].toString().toLowerCase())
      );
    }
  }

  res.json(products);
};

// Crée un nouveau produit à partir des données reçues et le sauvegarde
const createProduct = (req, res) => {
  const { name, category, material, durability, maintenance, design, origin } =
    req.body;
  // Génère un produit avec un identifiant unique
  const newProduct = createProductId({
    name,
    category,
    material,
    durability,
    maintenance,
    design,
    origin,
  });
  res.status(201).json({
    message: "Produit ajouté avec succès.",
    prod: newProduct,
  });
};

// Met à jour un produit existant selon son identifiant
const updateProduct = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const products = readDB();
  // Recherche l'index du produit à mettre à jour
  const productIndex = products.findIndex((prod) => prod.id === id);

  if (productIndex === -1) {
    // Produit non trouvé
    return res.status(404).json({
      message: "Produit non trouvé.",
    });
  }

  // Fusionne les anciennes et nouvelles données du produit
  products[productIndex] = {
    ...products[productIndex],
    ...updatedData,
  };

  writeDB(products);

  res.status(200).json({
    message: "Produit mis à jour avec succès.",
    prod: products[productIndex],
  });
};

// Supprime un produit selon son identifiant
const removeProduct = (req, res) => {
  const { id } = req.params;

  const products = readDB();
  // Recherche l'index du produit à supprimer
  const productIndex = products.findIndex((prod) => prod.id === id);

  if (productIndex === -1) {
    // Produit non trouvé
    return res.status(404).json({
      message: "Produit non trouvé.",
    });
  }

  // Supprime le produit de la liste
  const deletedProduct = products.splice(productIndex, 1);

  writeDB(products);

  res.status(200).json({
    message: "Produit supprimé avec succès.",
    prod: deletedProduct[0],
  });
};

// Permet à un utilisateur (hors admin) de noter un produit
const rateProduct = (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  // Convertit la note en nombre et la valide
  const numericRating = parseInt(rating, 10);
  if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
    return res.status(400).json({
      message: "La note doit être entre 1 et 5",
    });
  }

  // Empêche les admin de noter les produits
  if (req.user.role === "admin") {
    return res.status(403).json({
      message: "Impossible de noter un produit en tant qu'admin",
    });
  }

  const username = req.user.username;
  const products = readDB();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Produit non trouvé... désolé !",
    });
  }

  // Initialise le tableau des notes si besoin
  if (!product.ratings) {
    product.ratings = [];
  }

  // Vérifie si l'utilisateur a déjà noté ce produit
  const userAlreadyRatedProduct = product.ratings.find(
    (rating) => rating.username === username
  );

  if (userAlreadyRatedProduct) {
    return res.status(400).json({
      message: "Vous avez déjà classé ce produit... désolé !",
    });
  }

  // Ajoute la note
  const newRating = { username, numericRating };
  product.ratings.push(newRating);

  writeDB(products);

  res.status(201).json({
    message: "Note ajoutée... merci !",
    product,
  });
};

// Exporte les contrôleurs pour la gestion des produits
module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  removeProduct,
  rateProduct,
};
