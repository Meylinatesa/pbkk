// models/instruction.js
module.exports = (sequelize, DataTypes) => {
    const Instruction = sequelize.define('Instruction', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      step_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      recipe_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Recipes', // nama tabel di database
          key: 'id',
        },
      },
    });
  
    return Instruction;
  };
  