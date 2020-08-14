let NeDB = require('nedb');

let db = new NeDB({ // faz a chamada do Banco de Dados local NeDB
    filename: 'users.db',
    autoload: true

});

module.exports = app => {

    let route = app.route('/users'); //Chama o metodo App com todos os inludes(declarado na index), e coloca ele no route com o diretorio /users

    route.get((req, res) => { // Metodo de busca de usuario

        db.find({}).sort({ name: 1 }).exec((err, users) => { // comando de busca de usuario 

            if (err) { // retorno de erros
                app.utils.error.send(err, req, res);

            } else { // retorno da busca retorna um JSON
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users
                });

            }

        });

    });

    route.post((req, res) => { // Metodo de criaçao de usuario


        if (!app.utils.validator.user(app, req, res)) return false; // faz a validaçao dos campos antes de gravar no banco

        db.insert(req.body, (err, user) => { // faz o insert dentro do banco

            if (err) { // retorno de erros
                app.utils.error.send(err, req, res);

            } else { // retorna o comando de status informando processo concluido (200)
                res.status(200).json(user);

            }

        });

    });



    let routeId = app.route('/users/:id'); //Chama o metodo App com todos os inludes(declarado na index), e coloca ele no routeID com o diretorio /users/(id)

    routeId.get((req, res) => { // Metodo de busca de usuario para um usuario expecifico por ID

        db.findOne({ _id: req.params.id }).exec((err, user) => {// comando de busca de usuario por id

            if (err) { // retorno de erros
                app.utils.error.send(err, req, res);

            } else {// retorna o comando de status informando processo concluido (200)
                res.status(200).json(user);
            }

        });

    });

    routeId.put((req, res) => { // Metodo de alteraçao de usuario com o expecifico por ID


        if (!app.utils.validator.user(app, req, res)) return false; // faz a validaçao dos campos antes de alterar no banco

        db.update({ _id: req.params.id }, req.body, err => { // faz o update dentro do banco

            if (err) { // retorno de erros
                app.utils.error.send(err, req, res);

            } else { // retorna o comando de status informando processo concluido (200), retornando no Body
                res.status(200).json(Object.assign(req.params, req.body));

            }

        });

    });

    routeId.delete((req, res) => { // Metodo de delete de usuario com o expecifico por ID

        db.remove({ _id: req.params.id }, {}, err => { // faz o delete dentro do banco

            if (err) {// retorno de erros
                app.utils.error.send(err, req, res);

            } else {// retorna o comando de status informando processo concluido (200), retornando no Body
                res.status(200).json(req.params);

            }

        });

    });

};