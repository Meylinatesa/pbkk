// models/index.js
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

// Menginisialisasi Sequelize dan koneksi
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Memuat model-model
db.User = require("./user.js")(sequelize, Sequelize);
db.Recipe = require("./recipe.js")(sequelize, Sequelize);
db.Ingredient = require("./ingredient.js")(sequelize, Sequelize);
db.RecipeIngredient = require("./recipe-Ingredient.js")(sequelize, Sequelize);
db.Instruction = require("./instruction.js")(sequelize, Sequelize);

// Mengatur relasi antar model
// Relasi User dan Recipe menggunakan email sebagai foreign key
db.User.hasMany(db.Recipe, { foreignKey: 'email', sourceKey: 'email' });
db.Recipe.belongsTo(db.User, { foreignKey: 'email', targetKey: 'email' });

// Relasi Recipe dan Ingredient melalui RecipeIngredient
db.Recipe.belongsToMany(db.Ingredient, { through: db.RecipeIngredient, foreignKey: 'recipe_id' });
db.Ingredient.belongsToMany(db.Recipe, { through: db.RecipeIngredient, foreignKey: 'ingredient_id' });

// Relasi Recipe dan Instruction
db.Recipe.hasMany(db.Instruction, { foreignKey: 'recipe_id' });
db.Instruction.belongsTo(db.Recipe, { foreignKey: 'recipe_id' });

module.exports = db;
