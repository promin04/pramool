(function () {
  angular.module( 'comment' )
    .directive( 'commentAnswer' , ['$location', '$anchorScroll',function ($location , $anchorScroll) {
      var link = function ( scope , element , attr , ctrl ) {
        element.find('.comment-box').focus();
        $location.hash('comment-focus');
        $anchorScroll();
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
    }])
    .run(['$anchorScroll', function($anchorScroll) {
  $anchorScroll.yOffset = 280;   // always scroll by 280 extra pixels
}]);
})()
