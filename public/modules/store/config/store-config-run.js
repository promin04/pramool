(function () {
  angular.module('store')
  .run([
    '$rootScope','$state','modalAuthService','$http','userService','$urlRouter','$timeout',
    function ($rootScope,$state,modalAuthService,$http,userService,$urlRouter,$timeout) {
      $rootScope.$on('$stateChangeStart',function (event, toState, toParams, fromState, fromParams) {
        //callback for authModal
        var closed = function () {
        if($rootScope.user == undefined)
          $state.go('auction');
        }
        //fixed hidden overflow-y when change state
        $rootScope.body = 'bodylock';
        $timeout(function () {
          $rootScope.body = '';
        },600)

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
                  if(toState.name !== 'auction' && toState.name !== 'completed' && toState.name !== 'product.detail' ){

                      modalAuthService.open(closed);
                  }
              }
            );

      }

    });

    $rootScope.$watch('user',function (newValue, oldValue) {

      //defer state.current url (have to use $urlRouterProvider.deferIntercept() in config before)
      $urlRouter.sync();


      //close defer state.current url (have to use $urlRouterProvider.deferIntercept() in config before)
      $urlRouter.listen();
    });



    }
  ]);
})()
