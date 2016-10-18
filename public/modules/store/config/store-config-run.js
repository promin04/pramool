(function () {
  angular.module('store')
  .run([
    '$rootScope','$state','modalAuthService','$http','userService','$urlRouter','$timeout','notification',
    function ($rootScope,$state,modalAuthService,$http,userService,$urlRouter,$timeout,notification) {
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
                  if(toState.name === 'newProduct'){
                      modalAuthService.open(closed);
                  }
              }
            );

      }

    });

    $rootScope.$watch('user',function (newValue, oldValue) {
      if (oldValue && !newValue && oldValue !== newValue) {
        //re-direct when user log out & leaveAll rooms web socket
        socket.emit('leaveAll',$rootScope.notification_getlist);
        $rootScope.notification_getlist = null ;
        $state.go('auction');
      } else if (oldValue !== newValue) {
        //get namelist of rooms and join them all for notification when user login
        notification.getlist().then( function (response) {
        console.log('alll',response);
        $rootScope.notification_getlist = response ;
        socket.emit('joinAll',response);
        })
      }
      //callback for authModal
      var closed = function () {
      if($rootScope.user == undefined)
        $state.go('auction');
      }
      //defer state.current url (have to use $urlRouterProvider.deferIntercept() in config before)
      $urlRouter.sync();
      console.log($state.current.name,'stat current');
      if(($state.current.name !== 'auction') && !newValue && oldValue){

        modalAuthService.open(closed);
      }
      //close defer state.current url (have to use $urlRouterProvider.deferIntercept() in config before)
      $urlRouter.listen();
    });

    $rootScope.$watch('notification_virtual',function ( newValue , oldValue ) {
      if( Array.isArray(newValue) ){
        if($rootScope.notification_getlist.length > newValue.length ){
          //remove
          console.log('remove leave socket');
          for ( var i = 0 ; i < $rootScope.notification_getlist.length ; i++ ) {
              if (newValue.indexOf($rootScope.notification_getlist[i]) < 0) {
                  socket.emit('leave',$rootScope.notification_getlist[i]);
                  $rootScope.notification_getlist.splice(i,1);
              }
          }
        } else if($rootScope.notification_getlist.length < newValue.length) {
          //add
          console.log('add join socket');
              for ( var i = 0 ; i < newValue.length ; i++ ) {
                  if ($rootScope.notification_getlist.indexOf(newValue[i]) < 0) {
                      socket.emit('join',newValue[i]);
                      $rootScope.notification_getlist.push(newValue[i]);
                  }
              }
              console.log($rootScope.notification_getlist);
        }


      }
    });

    }
  ]);
})()
