/**
 * Created by Harsh on 2015-12-13.
 */
angular.module('starter.Searchcontrollers', [])

.controller('SerchCtrl', function ($scope, AuthFactory, $rootScope, $auth, Fetch_product, $http, $log, $ionicPopup) {

    //to check if user login or not

    if (AuthFactory.isLogged() == false) {
        $rootScope.$broadcast('showLoginModal', $scope, null, function () {

            if ($auth.isAuthenticated() == false) {

                $ionicPopup.alert({
                    title: 'Welcome',
                    content: $scope.loginData.username
                });
            } else {
                $ionicPopup.alert({
                    title: 'Welcome',
                    content: $scope.getName
                });
            }

            $scope.addThing = function (search) {

                Fetch_product.fetch(search).then(function (getdata) {

                    $scope.details = getdata.data.products;

                    //handle when no product found
                    if ($scope.details.length == 0) {
                        $log.error("No product found");
                        $ionicPopup.alert({
                            title: 'Error',
                            content: 'No product found:' + search
                        });
                    }
                });


                $log.error("Welcome to home");
            };

        });
    } else {

        $scope.addThing = function (search) {

            Fetch_product.fetch(search).then(function (getdata) {
                $scope.details = getdata.data.products;

                //handle when no product found
                if ($scope.details.length == 0) {
                    $log.error("No product found");
                    $ionicPopup.alert({
                        title: 'Error',
                        content: 'No product found:' + search
                    });
                }

            });

            $log.debug("Already login");

        };

    }








});