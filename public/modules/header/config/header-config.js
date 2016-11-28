(function () {
  angular.module('header',['search'])
    .config(['$stateProvider',function ($stateProvider) {

      $stateProvider
        .state('auction',{
          url : '/',
            template : '<div store class="store"></div>'

      })
        .state('completed',{
          url : '/completed',
          template : '<div store-completed class="store-completed"></div>'
      })

      }
    ]);

})()
