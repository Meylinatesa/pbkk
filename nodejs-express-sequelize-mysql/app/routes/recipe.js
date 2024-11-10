const express = require("express");
const router = express.Router();
const db = require("../models");
const Recipe = db.Recipe; // pastikan nama sesuai dengan model Anda
const resepkuController = require("../controllers/api/resepkuController");

router.post("/api/add-recipe", resepkuController.resep);

module.exports = router;
