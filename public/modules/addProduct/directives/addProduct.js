(function () {
  angular.module('addProduct')
    .directive('addProduct',['$timeout', 'imgManager' ,
      function ($timeout , imgManager) {
          var link = function (scope, element, attrs, that) {
            //check resolve from editMode
            if ( scope.resolve ) {
              $timeout(function () {
                console.log('scope.resolve',scope.resolve);
                //set value and type depend on input to evoid ng-model type error
                that.editMode = true;
                scope.product.input.name = scope.resolve.name.toString();
                scope.product.input.price = +scope.resolve.price;
                that.picture = angular.copy( scope.resolve.picture );
                that.oldPic = angular.copy( scope.resolve.picture );
                that.pointer = +scope.resolve.pointer;
                scope.product.input.description.detail = scope.resolve.description.detail.toString();
                scope.product.input.description.size = {};
                scope.product.input.description.size.width = +scope.resolve.description.size.width;
                scope.product.input.description.size.long =  +scope.resolve.description.size.long;
                scope.product.input.description.size.height = +scope.resolve.description.size.height;
                scope.product.input.description.weight = +scope.resolve.description.weight;
                scope.product.input.description.condition = scope.resolve.description.condition;
                imgManager.set( that.picture , that.picture , that.pointer);
              }, 100);
            }

          }
        return  {
            restrict: 'A',
            templateUrl : './modules/addProduct/views/addProduct.jade',
            scope : { resolve : '=' },
            controller: 'addProductController',
            controllerAs : 'product',
            link : link
          };
    }]);
})()
