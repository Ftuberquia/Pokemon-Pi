const { DataTypes } = require("sequelize");


const Type = (sequelize) => {
  sequelize.define("Type", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // se identifica de manera unica cada fila de tabla, y no puede contener valores null
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {timestamps: false}); // marca de tiempo
} 

module.exports = Type;