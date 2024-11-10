// models/ingredient.js
module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define("Ingredient", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.STRING,
      },
      unit: {
        type: DataTypes.STRING,
      },
      recipe_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Recipes",
          key: "id",
        },
      },
    });
  
    return Ingredient;
  };
  