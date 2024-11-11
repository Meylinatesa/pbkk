const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Gantilah 'your_secret_key' dengan key rahasia Anda

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Simpan data user yang didekodekan dari token ke req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
