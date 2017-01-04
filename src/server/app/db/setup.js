var q = require('q');
var Sequelize = require('sequelize');
var forceSync = false;

var sequelize = new Sequelize('work_request_manager', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres',
  storage: "session",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

// // Or you can simply use a connection uri
// var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
//
// var Session = sequelize.define('Sessions', {
//     sid: {
//       type: Sequelize.STRING,
//       primaryKey: true
//     },
//     userId: Sequelize.STRING,
//     expires: Sequelize.DATE,
//     data: Sequelize.STRING(50000)
// });

var User = sequelize.define('user',
    {
        name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        email: {
            type: Sequelize.STRING,
            field: 'email'
        },
        password: {
            type: Sequelize.STRING,
            field: 'password'
        },
        role: {
            type: Sequelize.INTEGER,
            field: 'role'
        },
    }, {
        freezeTableName: true,
        timestamps: true
    }
);

var promises = [
    User.sync({force: forceSync})
    // Session.sync({force: forceSync})
];

module.exports = {
    sequelize: sequelize,
    setupDone: q.all(promises),
    User: User
};
