(function () {
  angular.module('search')
    .controller( 'searchController' , [ '$http' , '$scope' , '$state' , function ( $http , $scope , $state) {
          this.search = function () {
            $state.go('search' , {name : $scope.searchText});
          }

          this.enter = function (event) {
            if(event.keyCode == 13){
              this.search();
            }
          }
    }]);
})()
