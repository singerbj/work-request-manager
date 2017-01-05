var validate = require('../db/validation');

module.exports = function(app, jsonParser, Task){
    app.get('/task', function(req, res) {
        Task.findAll().then(function (task) {
            res.send(JSON.stringify(task));
        });
    });
    app.get('/task/:id', function(req, res) {
        var id = parseInt(req.params.id, 10);
        Task.findOne({where: {id: id}}).then(function (task) {
            res.send(JSON.stringify(task));
        });
    });
    app.post('/task', jsonParser, function(req, res) {
        var body = req.body;
        body.userId = parseInt(body.userId, 10);
        body.status = parseInt(body.status, 10);
        var result = validate.task.create(body);
        if(result === true){
            Task.create(body).then(function(task){
                res.send(JSON.stringify(task));
            });
        }else{
            res.send(JSON.stringify({error: result}));
        }
    });
    app.put('/task', jsonParser, function(req, res) {
        var body = req.body;
        body.userId = parseInt(body.userId, 10);
        body.status = parseInt(body.status, 10);
        if(body.id){
            Task.update(body, {where: {id: body.id}}).then(function(task){
                res.send(JSON.stringify(task));
            });
        }else{
            res.send(JSON.stringify({error: 'No id specified.'}));
        }
    });
    app.delete('/task/:id', function(req, res) {
        var id = parseInt(req.params.id, 10);
        Task.destroy({where: {id: id}}).then(function (task) {
            res.send(JSON.stringify(task));
        });
    });
};
