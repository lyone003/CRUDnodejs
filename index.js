const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

let app = express(); // recebe os comando do espress.

app.use(bodyParser.urlencoded({ extended: false })); // ajuda o body-parse a converte independente da codificaçao da pag . 
app.use(bodyParser.json()); // chama o body-parse para interpretar o metodos q vem do html convertendo para JSON.
app.use(expressValidator()); // chama o express-validator.

consign().include('routes').include('utils').into(app); // cria a classe app com as classes inclidas 'routes' e 'utils'.

app.listen(3000, '127.0.0.1', () => { // Confirma o status do servidor.
    console.log('servidor rodando!'); // msg da pag de status.

});