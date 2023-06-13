const Turno = require("../models/turno");

exports.getTurnos = async() =>{
    try {
        const turnos = await Turno.findAll();
        return turnos;
      } catch (error) {
        throw new Error('Erro ao obter os turnos: ' + error.message);
      }
};