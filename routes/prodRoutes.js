// Définition des routes pour la gestion des produits

const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  removeProduct,
  rateProduct,
} = require("../controllers/prodControllers");

const authenticateJWT = require("../middlewares/tokenjwt");
const isAdmin = require("../middlewares/isAdmin");

const prodRoute = express.Router();

// Route GET pour récupérer tous les produits (admin uniquement)
prodRoute.get("/", authenticateJWT, isAdmin, getAllProducts);

// Route POST pour créer un nouveau produit (authentifié)
prodRoute.post("/createproduct", authenticateJWT, createProduct);

// Route PUT pour mettre à jour un produit existant (authentifié)
prodRoute.put("/updateproduct/:id", authenticateJWT, updateProduct);

// Route DELETE pour supprimer un produit existant (authentifié)
prodRoute.delete("/removeproduct/:id", authenticateJWT, removeProduct);

// Route POST pour noter un produit (authentifié)
prodRoute.post("/:id/rate", authenticateJWT, rateProduct);

module.exports = prodRoute;
