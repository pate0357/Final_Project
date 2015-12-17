/**
 * Created by Harsh on 2015-12-13.
 */
angular.module('starter.Storecontrollers', [])

.controller('find_storeCtrl', function ($scope, Fetch_Locatation, AuthFactory, $auth, $rootScope, $cordovaGeolocation, $http, $log, $ionicPopup) {
    //
    //show login model

    if (AuthFactory.isLogged() == false) {
        $rootScope.$broadcast('showLoginModal', $scope, null, function () {

            if ($auth.isAuthenticated() == false) {

                $ionicPopup.alert({
                    title: 'Welcome',
                    content: $scope.loginData.username
                });

            } else {

                var accessToken = localStorageService.get("satellizer_token");

                $http.get("https://graph.facebook.com/v2.2/me", {
                    params: {
                        access_token: accessToken,
                        fields: "id,name,picture",
                        format: "json"
                    }
                }).
                then(function (result) {
                    var profileData = result.data.name;
                    console.log(profileData.name);
                    $scope.getname = profileData;

                    //                return result.data.picture.data.url;

                }, function (error) {
                    alert("There was a problem getting your profile.");
                    console.log(error);
                });

                $ionicPopup.alert({
                    title: 'Welcome',
                    content: $scope.getname
                });


            }


            //            var getname = AuthFactory.social_username();
            //            console.log(getname);



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