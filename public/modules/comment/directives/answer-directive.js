(function () {
  angular.module( 'comment' )
    .directive( 'commentAnswer' , ['$location', '$anchorScroll','$timeout',function ($location , $anchorScroll , $timeout) {
      var link = function ( scope , element , attr , ctrl ) {
        element.find('.comment-box').focus();
        $location.hash('comment-focus');
        $anchorScroll();

        ctrl.close = function () {
          element.remove();

          $timeout(function () {
            var el = $( `.comment-each.no-${attr.no}`).find('.comment-content');
            var hi = el.height();
            $( `.comment-each.no-${attr.no}`).height(hi);
          }, 50);

        };

      };
      return {
        restrict : 'A' ,
        scope : { id : '@' , replied : '@'  },
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
