const Funcionario = require("../models/funcionario");

exports.cadastroFuncionario = async (req, res) => {
    try {
        const { nome, horasTrabalhadas, categoriaId, turnoId, salarioMinimo } = req.body
        let valorHora = 1

        if (parseInt(categoriaId) === 1 && (parseInt(turnoId) === 1 || parseInt(turnoId) === 2)) {  // Caso Categoria seja = G e turno = M ou V o percentual é de 4%
            const percentual = 0.04;
            valorHora = parseInt(salarioMinimo) * percentual;
        } else if (parseInt(categoriaId) === 2 && parseInt(turnoId) === 3) {   // Caso Categoria seja = F e turno = N  o percentual é de 2%
            const percentual = 0.02; // 2%
            valorHora = parseInt(salarioMinimo) * percentual;
        } else if (parseInt(categoriaId) === 2 && (parseInt(turnoId) === 1 || parseInt(turnoId) === 2)) { // Caso Categoria seja = F e turno = M ou V o percentual é de 1%
            const percentual = 0.01; // 1%
            valorHora = parseInt(salarioMinimo) * percentual;
        }

        const salarioInicial = valorHora * parseInt(horasTrabalhadas)


        const novoFuncionario = await Funcionario.create({
            nome,
            horasTrabalhadas: parseInt(horasTrabalhadas),
            categoriaId: parseInt(categoriaId),
            turnoId: parseInt(turnoId),
            salarioInicial,
            valorHora,
        });

        res.redirect("/funcionarios");
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar o funcionário' });
    }
};

exports.getFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.findAll();
        res.render("listaCadastro", {funcionarios: funcionarios});
    } catch (error) {
        res.status(500).send('Erro ao buscar os funcionários');
    }
};

exports.getFuncionarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const funcionario = await Funcionario.findByPk(id);

        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        res.status(200).send(funcionario);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao buscar o funcionário' });
    }
};

exports.updateFuncionario = async (req, res) => {
    const { id } = req.params;
    const { nome, horasTrabalhadas, categoriaId, turnoId, salarioMinimo } = req.body;

    let valorHora = 1

    if (categoriaId === 1 && (turnoId === 1 || turnoId === 2)) {  // Caso Categoria seja = G e turno = M ou V o percentual é de 4%
        const percentual = 0.04;
        valorHora = parseInt(salarioMinimo) * percentual;
    } else if (categoriaId === 2 && turnoId === 3) {   // Caso Categoria seja = F e turno = N  o percentual é de 2%
        const percentual = 0.02; // 2%
        valorHora = parseInt(salarioMinimo) * percentual;
    } else if (categoriaId === 2 && (turnoId === 1 || turnoId === 2)) { // Caso Categoria seja = F e turno = M ou V o percentual é de 1%
        const percentual = 0.01; // 1%
        valorHora = parseInt(salarioMinimo) * percentual;
    }

    const salarioInicial = valorHora * parseInt(horasTrabalhadas)

    try {
        // Verifica se o funcionário existe no banco de dados
        const funcionario = await Funcionario.findByPk(id);
        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        // Atualiza os atributos do funcionário com os novos valores
        funcionario.nome = nome;
        funcionario.horasTrabalhadas = parseInt(horasTrabalhadas);
        funcionario.categoriaId = parseInt(categoriaId);
        funcionario.turnoId = parseInt(turnoId);
        funcionario.valorHora = valorHora;
        funcionario.salarioInicial = salarioInicial

        // Salve as alterações no banco de dados
        await funcionario.save();

        res.status(200).send(funcionario);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao atualizar o funcionário' });
    }
};

exports.deletarFuncionario = async (req, res) => {
    const { id } = req.params;
    try {
        // Verifica se o funcionário existe no banco de dados
        const funcionario = await Funcionario.findByPk(id);
        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        // Exclui o funcionário do banco de dados
        await funcionario.destroy();

        res.status(200).send({ message: 'Funcionário excluído com sucesso' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao excluir o funcionário' });
    }
};

