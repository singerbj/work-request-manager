var validate = require('../db/validation');

module.exports = function(app, jsonParser, User){
    app.get('/user', function(req, res) {
        User.findAll({order: [['name'], ['email']]}).then(function (user) {
            res.send(JSON.stringify(user));
        });
    });
    app.get('/user/:id', function(req, res) {
        var id = parseInt(req.params.id, 10);
        User.findOne({where: {id: id}}).then(function (user) {
            res.send(JSON.stringify(user));
        });
    });
    app.post('/user', jsonParser, function(req, res) {
        var body = req.body;
        body.role = parseInt(body.role, 10);
        var result = validate.user(body);
        if(result === true){
            User.create(body).then(function(user){
                res.send(JSON.stringify(user));
            });
        }else{
            res.status(422);
            res.send(JSON.stringify({error: result}));
        }
    });
    app.put('/user', jsonParser, function(req, res) {
        var body = req.body;
        body.role = parseInt(body.role, 10);
        if(body.id){
            var result = validate.user(body);
            if(result === true){
                User.update(body, {where: {id: body.id}}).then(function(user){
                    res.send(JSON.stringify(user));
                });
            }else{
                res.status(422);
                res.send(JSON.stringify({error: result}));
            }
        }else{
            res.status(422);
            res.send(JSON.stringify({error: 'No id specified.'}));
        }
    });
    app.delete('/user/:id', function(req, res) {
        var id = parseInt(req.params.id, 10);
        User.destroy({where: {id: id}}).then(function (user) {
            res.send(JSON.stringify(user));
        });
    });
};
