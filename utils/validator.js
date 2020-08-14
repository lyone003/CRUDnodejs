module.exports = {

    user: (app, req, res) => { // Valida campos

        req.assert('name', 'O nome é obrigatório.').notEmpty(); // Valida nome  
        req.assert('email', 'O e-mail está inválido.').notEmpty().isEmail(); // Valida Email

        let errors = req.validationErrors();

        if (errors) { // trata o erro
            app.utils.error.send(errors, req, res);
            return false;

        } else {
            return true;

        }

    }

};