(function () {
  angular.module( 'comment' )
    .directive( 'commentAnswer' , function () {
      var link = function ( scope , element , attr , ctrl ) {
        ctrl.close = function () {
          element.remove();
        };
      }
      return {
        restrict : 'A' ,
        scope : { id : '@'  },
        templateUrl : './modules/comment/views/answer.jade',
        controller : 'answerController',
        controllerAs : 'answer',
        link : link
      };
    });
})()
