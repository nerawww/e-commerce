// Point d'entrée principal de l'application Express

const express = require("express");
const cookieParser = require("cookie-parser");

// Importe les routeurs pour les produits et l'authentification
const prodRouter = require("./routes/prodRoutes");
const authRoute = require("./routes/authRoutes");

const app = express();
const host = "localhost";
const PORT = 5000;

// Middleware pour parser les requêtes JSON et les cookies
app.use(express.json());
app.use(cookieParser());

// Monte les routeurs pour les produits et l'authentification
app.use("/api/v1/products", prodRouter);
app.use("/auth", authRoute);

// Démarre le serveur et affiche l'URL dans la console
app.listen(PORT, () => {
  console.log(`Le serveur est en ligne sur : http://${host}:${PORT}`);
});
