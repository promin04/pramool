(function () {
  angular.module('comment')
    .directive('commentHeight' , [ '$timeout' , function ( $timeout ) {
      var link = function (scope , element , attrs) {

        $timeout(function () {

          var hi = element.find('.comment-content').height();
          element.height(hi);
          console.log(element , element.height() , hi);
        }, 10);

      }
      return {
        restrict : 'A' ,
        link:link
      };
    }]
  )
})()
