"use strict"
var User = require('mongoose').model('User');
module.exports = {
    render
};

//-------------------------------------------------------------------------------
//signup
//------------------------------------------------------------------------------
function render(req,res) {
      res.render('index');
}
