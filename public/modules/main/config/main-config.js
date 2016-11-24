(function () {
  angular.module('main')
  .config(['$animateProvider',function ($animateProvider) {

     $animateProvider.classNameFilter(/^((?!(noAnimate)).)*$/);

    }
  ]);
}
)()
