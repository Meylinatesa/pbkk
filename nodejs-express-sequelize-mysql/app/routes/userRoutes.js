// app/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../models");
// const User = db.User; // pastikan nama sesuai dengan model Anda
const registerController = require("../controllers/api/registerController");
const loginController = require("../controllers/api/loginController");
const resepkuController = require("../controllers/api/resepkuController");

// Register route
router.post("/register", registerController.register);

// Login route
router.post("/login", loginController.login);

router.post("/add-recipe", resepkuController.resep);

module.exports = router;
