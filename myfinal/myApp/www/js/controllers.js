angular.module('starter.controllers', [])


//this for login when app start.
.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $auth, $ionicPopup, AuthFactory, $rootScope, $window, localStorageService, $http) {

    $rootScope.LoggedIn = function () {
        return AuthFactory.isLogged();

    };
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $rootScope.$on('showLoginModal', function ($event, scope, cancelCallback, callback, $http, localStorageService) {
        // Form data for the login modal
        $scope.loginData = {};
        $scope = scope || $scope;
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/Login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.login();
        });

        // Triggered in the login modal to close it
        //        $scope.closeLogin = function () {
        //            $scope.modal.hide();
        //            if (typeof cancelCallback === 'function') {
        //                cancelCallback();
        //            }
        //        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        //social login.
        $scope.authenticate = function (provider) {
            $auth.authenticate(provider)
                .then(function (data) {
                    console.log(data.access_token);
                    AuthFactory.social_username(data.access_token);

                    $scope.modal.hide();

                })
                .catch(function (response) {
                    $ionicPopup.alert({
                        title: 'Error',
                        content: response.data ? response.data || response.data.message : response
                    })

                });
        };
        $scope.logout = function () {
            $auth.logout();
            $window.location.reload();
        };

        $scope.isAuthenticated = function () {
            return $auth.isAuthenticated();

        };





        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {


            var validate = AuthFactory.login($scope.loginData.username, $scope.loginData.password);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            if (validate == true) {
                $timeout(function () {
                    $scope.modal.hide();
                    if (typeof callback === 'function') {
                        callback();
                        //$window.location.reload();
                    }
                }, 1000);

            }
        };


    });

    $rootScope.isAuthenticated = function () {

        return $auth.isAuthenticated();

    };
    $rootScope.loginFromMenu = function () {
        $rootScope.$broadcast('showLoginModal', $scope, null, function () {
            $window.location.reload();
        });
    };
    $rootScope.logoutFromMenu = function () {

        AuthFactory.logout();
        $auth.logout();
        $window.location.reload();
    };



});