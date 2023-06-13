const Categoria = require("../models/categoria");

exports.getCategorias = async() => {
    try {
        const categorias = await Categoria.findAll();
        return categorias;
      } catch (error) {
        throw new Error('Erro ao obter as categorias: ' + error.message);
      }
};