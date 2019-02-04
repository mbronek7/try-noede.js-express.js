var User = require('../models/user');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true});

var newAdmin = new User();
newAdmin.email = "admin@rolniczy.pl";
newAdmin.password = newAdmin.encryptPassword("admin");
newAdmin.isAdmin = true;
var admins = [
  newAdmin
];

var done = 0;
for (var i = 0; i < admins.length; i++) {
    admins[i].save(function(err, result) {
        done++;
        if (done === admins.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}