// load scss file
require('style!css!../../lib/bootstrap/dist/css/bootstrap.min.css');
require('style!css!../../lib/ng-visible-invisible/dist/ng-visible-invisible.min.css');
require('../../../scss/style.scss');

(function () {

  var app = angular.module('main',['ui.router','ngAnimate','ng-visible-invisible','ui.bootstrap','ngFileUpload','header','store','dashboard']);

})();
