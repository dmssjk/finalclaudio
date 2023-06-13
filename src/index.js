const express = require("express")
const app = express()
const path = require('path');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


(async () => {
    try {
        const database = require('./db');
        const Categoria = require('./models/categoria');
        const Turno = require('./models/turno');
        const Funcionario = require('./models/funcionario');
        await database.sync();

        app.listen(3000, function (erro) {
            if (erro) {
                console.log('Ocorreu um erro');
            } else {
                console.log('Servidor iniciado com sucesso na porta 3000');
            }
        });
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
})();

const routes = require("./routes")
app.use('/', routes);