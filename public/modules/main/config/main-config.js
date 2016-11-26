(function () {
  angular.module('main')
  .config(['$animateProvider', '$locationProvider' , function ($animateProvider , $locationProvider) {

       $animateProvider.classNameFilter(/^((?!(noAnimate)).)*$/);

       $locationProvider.html5Mode({
        enabled: true,
        requireBase: true,
        rewriteLinks: true
      });
    }
  ]);
}
)()
