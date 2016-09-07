"use strict"
var User = require('mongoose').model('User');
module.exports = {
    render:function (req,res) {

          res.render('index');
    }
};
