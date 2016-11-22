(function () {
  angular.module('header',['search'])
    .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
      $urlRouterProvider
        .otherwise('/');
      $stateProvider
        .state('auction',{
          url : '/',
          templateUrl : './modules/store/views/store.jade'

      })
        .state('completed',{
          url : '/completed',
          template : '<div store-completed class="store-completed"></div>'
      })

      }
    ]);

})()
