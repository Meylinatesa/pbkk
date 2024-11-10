const { User } = require('../../models');
const bcrypt = require('bcrypt');

const loginController = {
  async login(req, res) {
    try {
      const email = req.body.email.trim();
      const password = req.body.password.trim();

      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          message: 'Email dan password harus diisi'
        });
      }

      // Check if user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Email tidak ditemukan' });
      }

      // Compare passwords
      console.log('Provided password:', password);
      console.log('Stored hash:', user.password);
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('result:', isMatch);
      
      if (!isMatch) {
        return res.status(400).json({ message: 'Password salah' });
      }

      // Login successful
      res.status(200).json({
        message: 'Login berhasil',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({
        message: 'Gagal login',
        error: error.stack || error.message || error
      });
    }
  }
};

module.exports = loginController;
