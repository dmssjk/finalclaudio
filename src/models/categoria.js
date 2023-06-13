const Sequelize = require("sequelize");
const database = require("../db");

const Categoria = database.define(
  "categoria",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoria: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Categoria;
