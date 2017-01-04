var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json();

var clientFolderPath = __dirname.replace('server', '') + 'client/';
app.use((express.static(clientFolderPath)));
app.get('/', function(req, res) {
    res.sendFile(clientFolderPath + 'index.html');
});

var db = require('./app/db/setup');
db.setupDone.then(function(){
    var User = db.User;
    require('./app/controllers/userController')(app, jsonParser, User);
    app.listen(3000);
    console.log('listening on port 3000');
}).catch(function(err){
    console.log(err);
});
