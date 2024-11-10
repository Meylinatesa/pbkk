const { User } = require('../../models');
const bcrypt = require('bcrypt');

const registerController = {
  async register(req, res) {
    try {
      const { username, email, password, role } = req.body;

      // Validasi input
      if (!username || !email || !password) {
        return res.status(400).json({
          message: 'Username, email, dan password harus diisi'
        });
      }

      // Periksa peran pengguna
      if (['admin', 'author'].includes(role)) {
        // Peran admin dan author diperbolehkan
      } else {
        // Jika bukan admin atau author, set peran menjadi 'guest'
        role = 'guest';
      }

      // Periksa apakah email sudah terdaftar
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email sudah terdaftar' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Buat user baru
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role
      });

      res.status(201).json({
        message: 'Registrasi berhasil',
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role
        }
      });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({
        message: 'Gagal menyimpan data user',
        error: error.stack || error.message || error
      });
    }
  }
};

module.exports = registerController;