// const express = require("express");
// const router = express.Router();
// const db = require("../models");
// const Recipe = db.Recipe; // pastikan nama sesuai dengan model Anda
// const resepkuController = require("../controllers/api/resepkuController");

// router.post("/add-recipe", resepkuController.resep);

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const resepkuController = require("../controllers/api/resepkuController");

// Konfigurasi multer untuk menyimpan file dengan nama dan ekstensi yang sesuai
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Pastikan folder 'uploads' sudah ada
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route untuk menambahkan resep, dengan middleware upload.single('image')
router.post("/add-recipe", upload.single('image'), resepkuController.resep);

module.exports = router;

