/**
 * Created by Harsh on 2015-12-13.
 */
angular.module('starter.Searchcontrollers', [])

  .controller('SerchCtrl', function($scope,AuthFactory,$rootScope,Fetch_product,$http,$log) {

//to check if user login or not

    if(AuthFactory.isLogged() == false ){
      $rootScope.$broadcast('showLoginModal', $scope, null, function()
      {


        $scope.addThing = function (search) {

          Fetch_product.fetch(search).then(function(getdata) {
            $scope.details = getdata.data.products;

          });
          $log.error("This is error");
        };

      });
    }

    else
    {

      $scope.addThing = function (search) {

        Fetch_product.fetch(search).then(function(getdata) {
          $scope.details = getdata.data.products;

        });

        $log.debug("Already login");

      };

    }








  });
