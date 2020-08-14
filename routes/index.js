module.exports = app => {

    app.get('/', (req, res) => { //pag html que e apresentada

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>RESTful API</h1>');

    });

};