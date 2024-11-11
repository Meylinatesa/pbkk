const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const db = require("./app/models");
const userRoutes = require('./app/routes/userRoutes'); // pastikan path sesuai
const recipe = require('./app/routes/recipe');
// const auth = require('./app/middleware/auth')
// const authRoutes = require('./routes/auth');
const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// app.use('/api', auth, userRoutes); // Melindungi semua route di userRoutes dengan auth
// app.use('/api', auth, recipe); // Melindungi semua route di recipe dengan auth

// Add this line to serve uploaded files
app.use('/uploads', express.static('uploads'));

// Route untuk API
app.use('/api', userRoutes);
// app.use('/api/register', userRoutes);
// app.use('/api/login', userRoutes);
app.use('/api', recipe);

// Sinkronisasi dengan database
db.sequelize.sync().then(() => {
  console.log("Database synchronized.");
});

// Route sederhana
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

// Route to handle recipe submissions, including image upload
const resepkuController = require('./app/controllers/api/resepkuController');
// app.post('/api/add-recipe', upload.single('image'), resepkuController.resep);

// Jalankan server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
