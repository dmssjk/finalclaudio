const express = require("express");
const router = express.Router();

const funcionarioController = require("./controllers/funcionarioController");
const categoriaController = require("./controllers/categoriaController");
const turnoController = require("./controllers/turnoController");

router.get("/funcionarios/", funcionarioController.getFuncionarios);

router.get("/funcionarios/:id", funcionarioController.getFuncionarioById);

router.post("/funcionarios/", funcionarioController.cadastroFuncionario);

router.put("/funcionarios/:id", funcionarioController.updateFuncionario);

router.delete("/funcionarios/:id", funcionarioController.deletarFuncionario);

router.get("/categoria/", categoriaController.getCategorias);

router.get("/turnos/", turnoController.getTurnos);

router.get('/', (req, res) => {
    res.render("index");
});

router.get('/cadastro', (req, res) => {
    res.render("cadastro");
});

module.exports = router;