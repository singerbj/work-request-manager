var validate = require('../db/validation');

module.exports = function(app, easySession, jsonParser, User){
    app.get('/status', easySession.isLoggedIn(), function(req, res) {
        res.send(JSON.stringify({result: 'success'}));
    });

    app.post('/login', jsonParser, function(req, res) {
        var body = req.body;
        User.findOne({where: {email: body.email, password: body.password}}).then(function (result) {
            if(result){
                req.session.login({userId: result.dataValues.id}, function (err) {
                    if(!err) {
                        res.send(JSON.stringify({result: 'success'}));
                    }else{
                        res.sendStatus(500);
                    }
                });
            }else{
                res.sendStatus(500);
            }
        });
    });
    app.post('/logout', function(req, res) {
        req.session.logout(function (err) {
            if(!err) {
                res.send(JSON.stringify({result: 'success'}));
            }else{
                res.sendStatus(500);
            }
        });
    });
};
