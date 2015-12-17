/**
 * Created by Harsh on 2015-12-13.
 */
angular.module('starter.Storecontrollers', [])

.controller('find_storeCtrl', function ($scope, Fetch_Locatation, AuthFactory, $auth, $rootScope, $cordovaGeolocation, $http, $log, $ionicPopup) {

    //show login model

    if (AuthFactory.isLogged() == false) {
        $rootScope.$broadcast('showLoginModal', $scope, null, function () {

            if ($auth.isAuthenticated() == false) {
                console.log($auth.isAuthenticated());
                var mypopup = $ionicPopup.alert({
                    title: 'Welcome',
                    content: $scope.loginData.username
                });




            }
            //call it here
            var posOptions = {
                timeout: 10000,
                enableHighAccuracy: false
            };
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                        var lat = position.coords.latitude;
                        var long = position.coords.longitude;
                        Fetch_Locatation.fetchdefault_location(lat, long).then(function (get_defaultlocation) {
                            $scope.details = get_defaultlocation.data.stores;

                        });
                    },
                    function (err) {
                        // error
                    });


            $scope.findLocation = function (city) {



                if (city != null || city != " ") {
                    Fetch_Locatation.fetchcity(city).then(function (get_city) {
                        $scope.details = get_city.data.stores;
                        //handle when no search found
                        if ($scope.details.length == 0) {
                            $log.error("No city found");
                            $ionicPopup.alert({
                                title: 'Error',
                                content: 'No city found:' + city
                            });
                        }

                    });

                }

            };



        });
    } else {
        {
            //call it here
            var posOptions = {
                timeout: 10000,
                enableHighAccuracy: false
            };
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                        var lat = position.coords.latitude;
                        var long = position.coords.longitude;
                        Fetch_Locatation.fetchdefault_location(lat, long).then(function (get_defaultlocation) {
                            $scope.details = get_defaultlocation.data.stores;

                        });
                    },
                    function (err) {
                        // error
                    });


            $scope.findLocation = function (city) {


                if (city != null || city != " ") {
                    Fetch_Locatation.fetchcity(city).then(function (get_city) {
                        $scope.details = get_city.data.stores;

                        //handle when no search found
                        if ($scope.details.length == 0) {
                            $log.error("No city found");
                            $ionicPopup.alert({
                                title: 'Error',
                                content: 'No city found:' + city
                            });
                        }
                    });

                }

            };
        }
    }

});