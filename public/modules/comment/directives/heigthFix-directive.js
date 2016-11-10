(function () {
  angular.module('comment')
    .directive('commentHeight' , [ '$timeout' , function ( $timeout ) {
      var link = function (scope , element , attrs) {

        $timeout(function () {
          var el = element.find('.comment-content');
          var hi = el.height();

          if (hi) {
            element.height(hi);
          }

          el.find('.comment-answer-reply').bind( 'click' , function () {
            $timeout(function () {
              el = element.find('.comment-content');
              hi = el.height();
              console.log('555+',hi ,el);
              element.height(hi);
            }, 50);
          });

        }, 0);

      }
      return {
        restrict : 'A' ,
        link:link
      };
    }]
  )
})()
