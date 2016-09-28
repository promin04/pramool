(function () {
  angular.module('store')
  .run([
    '$rootScope','$state','modalAuthService','$http','userService','$urlRouter',
    function ($rootScope,$state,modalAuthService,$http,userService,$urlRouter) {
      $rootScope.$on('$stateChangeStart',function (event, toState, toParams, fromState, fromParams) {
        var closed = function () {
        if($rootScope.user == undefined)
          $state.go('auction');
        }

        if ($rootScope.user == undefined) {

            userService.getUser()
            .then(
              //resolve can get username
              function (res) {
                console.log(res,'nice');
              },
              //reject unlog-in username=null
              function (reject) {
                console.log(reject);
                  //check state
                  if(toState.name === 'newProduct'){
                      modalAuthService.open(closed);
                  }
              }
            );

      }

    });

    $rootScope.$watch('user',function (newValue, oldValue) {
      //defer state.current url (have to use $urlRouterProvider.deferIntercept() in config before)
      $urlRouter.sync();
      console.log($state.current.name,'stat current');
      if(($state.current.name !== 'auction') && !newValue && oldValue){
        modalAuthService.open(closed);
      }
      //close defer state.current url (have to use $urlRouterProvider.deferIntercept() in config before)
      $urlRouter.listen();
    });

    }
  ]);
})()
