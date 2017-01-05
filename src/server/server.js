var express = require('express');

var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json();
var session = require('express-session');
// var cookieParser = require('cookie-parser');
// var easySession = require('easy-session');

var clientFolderPath = __dirname.replace('server', '') + 'client/';
app.use((express.static(clientFolderPath)));
app.get('/', function(req, res) {
    res.sendFile(clientFolderPath + 'index.html');
});

// app.use(cookieParser());
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
// }));
// app.use(easySession.main(session, {maxFreshTimeout: 300000 }));

var db = require('./app/db/setup');
db.setupDone.then(function(){
    var User = db.User;
    var Task = db.Task;
    // require('./app/controllers/loginController')(app, jsonParser, User);
    require('./app/controllers/userController')(app, jsonParser, User);
    require('./app/controllers/taskController')(app, jsonParser, Task);
    app.listen(3000);
    console.log('listening on port 3000');
}).catch(function(err){
    console.log(err);
});
