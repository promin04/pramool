(function () {
  angular.module('comment')
    .service('replaceDiv',[
    function () {
      this.clear = function (message) {

        var newMessage = message
        .replace( new RegExp('<div><br></div>', 'g') , '<br />' )
        .replace( new RegExp('<div>', 'g') , '<br />' )
        .replace( new RegExp('</div>', 'g') , '' );

        return newMessage;
      };

    }])
})()
