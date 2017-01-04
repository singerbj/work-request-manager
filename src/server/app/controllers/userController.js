var validate = require('../db/validation');

module.exports = function(app, easySession, jsonParser, User){
    app.get('/user', easySession.isLoggedIn(), function(req, res) {
        User.findAll().then(function (user) {
            res.send(JSON.stringify(user));
        });
    });
    app.get('/user/:id', easySession.isLoggedIn(), function(req, res) {
        var id = parseInt(req.params.id, 10);
        User.findOne({where: {id: id}}).then(function (user) {
            res.send(JSON.stringify(user));
        });
    });
    app.post('/user', easySession.isLoggedIn(), jsonParser, function(req, res) {
        var body = req.body;
        body.role = parseInt(body.role, 10);
        var result = validate.user.create(body);
        if(result === true){
            User.create(body).then(function(user){
                res.send(JSON.stringify(user));
            });
        }else{
            res.send(JSON.stringify({error: result}));
        }
    });
    app.put('/user', easySession.isLoggedIn(), jsonParser, function(req, res) {
        var body = req.body;
        body.role = parseInt(body.role, 10);
        if(body.id){
            User.update(body, {where: {id: body.id}}).then(function(user){
                res.send(JSON.stringify(user));
            });
        }else{
            res.send(JSON.stringify({error: 'No id specified.'}));
        }
    });
    app.delete('/user/:id', easySession.isLoggedIn(), function(req, res) {
        var id = parseInt(req.params.id, 10);
        User.destroy({where: {id: id}}).then(function (user) {
            res.send(JSON.stringify(user));
        });
    });
};
