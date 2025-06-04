# API E-commerce

Une API REST complète pour une application e-commerce développée avec Node.js et Express.js.

## 📋 Description

Cette API permet de gérer un système e-commerce avec authentification des utilisateurs, gestion des produits et système de notation. Elle utilise des fichiers JSON comme base de données et implémente l'authentification JWT avec des cookies sécurisés.

## 🚀 Fonctionnalités

### Authentification
- ✅ Inscription d'utilisateurs avec rôles (client/admin)
- ✅ Connexion avec JWT
- ✅ Déconnexion sécurisée
- ✅ Hachage des mots de passe avec bcrypt

### Gestion des Produits
- ✅ Création de produits (utilisateurs authentifiés)
- ✅ Lecture de tous les produits avec filtres (admin uniquement)
- ✅ Mise à jour de produits (utilisateurs authentifiés)
- ✅ Suppression de produits (utilisateurs authentifiés)
- ✅ Système de notation des produits (clients uniquement)

### Sécurité
- ✅ Middleware d'authentification JWT
- ✅ Contrôle d'accès basé sur les rôles
- ✅ Cookies sécurisés (httpOnly, sameSite)

## 🛠️ Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **bcrypt** - Hachage des mots de passe
- **jsonwebtoken** - Authentification JWT
- **uuid** - Génération d'identifiants uniques
- **cookie-parser** - Gestion des cookies
- **nodemon** - Rechargement automatique en développement

## 📦 Installation

1. Clonez le repository
```bash
git clone <url-du-repository>
cd js
```

2. Installez les dépendances
```bash
npm install
```

3. Démarrez le serveur
```bash
npm start
```

Le serveur sera accessible sur `http://localhost:5000`

## 📚 API Endpoints

### Authentification

| Méthode | Endpoint | Description | Authentification |
|---------|----------|-------------|------------------|
| POST | `/auth/register` | Inscription d'un utilisateur | ❌ |
| POST | `/auth/login` | Connexion | ❌ |
| POST | `/auth/logout` | Déconnexion | ❌ |

### Produits

| Méthode | Endpoint | Description | Authentification |
|---------|----------|-------------|------------------|
| GET | `/api/v1/products` | Récupérer tous les produits | ✅ Admin |
| POST | `/api/v1/products/createproduct` | Créer un produit | ✅ |
| PUT | `/api/v1/products/updateproduct/:id` | Mettre à jour un produit | ✅ |
| DELETE | `/api/v1/products/removeproduct/:id` | Supprimer un produit | ✅ |
| POST | `/api/v1/products/:id/rate` | Noter un produit | ✅ Client |

## 🔧 Exemples d'utilisation

### Inscription
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "motdepasse123",
    "role": "client"
  }'
```

### Connexion
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "motdepasse123"
  }'
```

### Créer un produit
```bash
curl -X POST http://localhost:5000/api/v1/products/createproduct \
  -H "Content-Type: application/json" \
  -H "Cookie: token=votre_jwt_token" \
  -d '{
    "name": "Nouveau Produit",
    "category": "Électronique",
    "material": "Plastique recyclé",
    "durability": "5 ans",
    "maintenance": "Nettoyage mensuel",
    "design": "Moderne",
    "origin": "Fabriqué en France"
  }'
```

### Noter un produit
```bash
curl -X POST http://localhost:5000/api/v1/products/product-id/rate \
  -H "Content-Type: application/json" \
  -H "Cookie: token=votre_jwt_token" \
  -d '{
    "rating": 5
  }'
```

## 📁 Structure du projet

```
js/
├── controllers/
│   ├── authControllers.js    # Contrôleurs d'authentification
│   └── prodControllers.js    # Contrôleurs de produits
├── db/
│   ├── products.json         # Base de données des produits
│   └── users.json           # Base de données des utilisateurs
├── middlewares/
│   ├── isAdmin.js           # Middleware de vérification admin
│   └── tokenjwt.js          # Middleware d'authentification JWT
├── routes/
│   ├── authRoutes.js        # Routes d'authentification
│   └── prodRoutes.js        # Routes des produits
├── utils/
│   ├── prodUtils.js         # Utilitaires pour les produits
│   └── userUtils.js         # Utilitaires pour les utilisateurs
├── index.js                 # Point d'entrée de l'application
└── package.json             # Configuration et dépendances
```

## 👥 Utilisateurs par défaut

L'application contient des utilisateurs de test :

| Username | Role | Description |
|----------|------|-------------|
| Laura | admin | Administrateur |
| Tonio | client | Client standard |
| Gustavo | client | Client standard |
| Edouardo | client | Client standard |

## 🔐 Sécurité

- Les mots de passe sont hachés avec bcrypt (salt rounds: 10)
- Les tokens JWT expirent après 1 heure
- Les cookies sont configurés avec `httpOnly` et `sameSite: 'Strict'`
- Les administrateurs ne peuvent pas noter les produits
- Les utilisateurs ne peuvent noter qu'une seule fois par produit

## 🚀 Prochaines améliorations

- [ ] Migration vers une vraie base de données (MongoDB/PostgreSQL)
- [ ] Validation des données d'entrée avec Joi
- [ ] Gestion des images de produits
- [ ] Système de panier
- [ ] Gestion des commandes
- [ ] Tests unitaires
- [ ] Documentation Swagger
- [ ] Variables d'environnement (.env)

## 📝 Licence

ISC

## 👨‍💻 Auteur

**moi**