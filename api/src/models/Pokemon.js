const { DataTypes } = require("sequelize");


const Pokemon = (sequelize) => {
  sequelize.define("Pokemon", {
    id: {
      type: DataTypes.UUID, //la tenia INTEGER
      primaryKey: true,
      // autoIncrement: true, // con id no me salia error cuando lo cambie me registro error 
      unique: true,
      defaultValue:DataTypes.UUIDV4 //agregado con UUID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hp: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 400 },
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 350 },
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 400 },
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 100 },
    },
    height: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 150 }
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 300 }
    },
    imgUrl: {
      type: DataTypes.TEXT,
      isUrl: true
    },
    custom: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {timestamps: false});
}

module.exports = Pokemon;