var validate = require('../db/validation');

module.exports = function(app, jsonParser, User){
    app.get('/user', function(req, res) {
        User.findAll().then(function (user) {
            res.send(JSON.stringify(user));
        });
    });
    app.get('/user/:id', function(req, res) {
        var id = req.params.id;
        User.findOne({id: id}).then(function (user) {
            res.send(JSON.stringify(user));
        });
    });
    app.post('/user', jsonParser, function(req, res) {
        var body = req.body;
        var result = validate.user.create(body);
        if(result === true){
            User.create(body).then(function(user){
                res.send(JSON.stringify(user));
            });
        }else{
            res.send(JSON.stringify({error: result}));
        }
    });
    app.put('/user', jsonParser, function(req, res) {
        var body = req.body;
        if(body.id){
            User.update(body, {where: {id: body.id}}).then(function(user){
                res.send(JSON.stringify(user));
            });
        }else{
            res.send(JSON.stringify({error: 'No id specified.'}));
        }
    });
    app.delete('/user/:id', function(req, res) {
        var id = req.params.id;
        User.destroy({where: {id: id}}).then(function (user) {
            res.send(JSON.stringify(user));
        });
    });
};
