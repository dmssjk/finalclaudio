const Sequelize = require('sequelize');
const database = require('../db');

const Turno = database.define(
    'turno',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        turno: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Turno;