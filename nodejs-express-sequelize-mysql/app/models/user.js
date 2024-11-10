const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'author', 'guest'),
      allowNull: false,
      defaultValue: 'guest'
    }
  });

  // Tambahkan hooks untuk logging
  User.beforeValidate(async (user) => {
    console.log('Data sebelum validasi:', {
      username: user.username,
      email: user.email,
      role: user.role
    });
  });

  User.beforeCreate(async (user) => {
    // Log data yang dikirim sebelum pembuatan user
    console.log('Data sebelum create:', {
      username: user.username,
      email: user.email,
      role: user.role
    });
    
    // Hash password
    console.log('Before hashing:', user.password);
    // Check if the password is already hashed
  if (!user.password.startsWith('$2b$')) {  // bcrypt hashes start with $2b$
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log('Hashed password:', hashedPassword);
    user.password = hashedPassword;
  }
  });

  return User;
};