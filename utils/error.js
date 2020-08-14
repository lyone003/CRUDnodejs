module.exports = {
    send: (err, req, res, code = 400) => { // retorna erro se houver
        console.log(`error: ${err}`);
        res.status(code).json({
            error: err
            
        });

    }
};