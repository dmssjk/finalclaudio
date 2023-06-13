const Sequelize = require('sequelize');
const database = require('../db');
const Categoria = require('./categoria');
const Turno = require('./turno');

const Funcionario = database.define(
  'funcionario',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    horasTrabalhadas: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    categoriaId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Categoria,
        key: 'id',
      },
    },
    turnoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Turno,
        key: 'id',
      },
    },
    salarioInicial: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    valorHora: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Funcionario;