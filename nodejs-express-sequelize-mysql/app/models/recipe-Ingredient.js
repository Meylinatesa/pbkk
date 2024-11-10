// models/recipe-Ingredient.js
module.exports = (sequelize, DataTypes) => {
    const RecipeIngredient = sequelize.define('RecipeIngredient', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recipe_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'recipes', // nama tabel 'Recipes'
          key: 'id',
        },
      },
      ingredient_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'ingredients', // nama tabel 'Ingredients'
          key: 'id',
        },
      },
    });
  
    return RecipeIngredient;
  };
  