(function () {
  angular.module('main')
  .config(['$animateProvider', '$locationProvider' , '$urlRouterProvider' ,
  function ($animateProvider , $locationProvider , $urlRouterProvider) {

       $animateProvider.classNameFilter(/^((?!(noAnimate)).)*$/);

       $locationProvider.html5Mode(true).hashPrefix('!');

      $urlRouterProvider.otherwise('/');
    }
  ]);
}
)()
