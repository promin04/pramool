(function () {
  angular.module('header',[])
    .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
      $urlRouterProvider
        .otherwise('/');
      $stateProvider
        .state('auction',{
          url : '/',
          template : '<div store class="store"></div>'

      })
        .state('completed',{
          url : '/completed',
          template : '<div store-completed class="store"></div>'
      })

      }
    ]);

})()
