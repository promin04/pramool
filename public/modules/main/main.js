// load scss file
require('style!css!../../lib/bootstrap/dist/css/bootstrap.min.css');
require('../../../scss/style.scss');

(function () {

  var app = angular.module('main',['ui.router','ngAnimate','ui.bootstrap','ngFileUpload','header','store','dashboard']);

})();
