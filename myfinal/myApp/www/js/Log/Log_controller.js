/**
 * Created by Harsh on 2015-12-13.
 */
angular.module('starter.Logcontrollers', [])




.controller('LogCtrl', function ($scope, AuthFactory, $rootScope, $log, $auth, localStorageService, $ionicPopup) {


    if (AuthFactory.isLogged() == false) {
        $rootScope.$broadcast('showLoginModal', $scope, null, function () {

            if ($auth.isAuthenticated() == false) {
                $ionicPopup.alert({
                    title: 'Welcome',
                    content: $scope.loginData.username
                });
            }

            var x = localStorage.getItem("test");
            $scope.Error = JSON.parse(x);
        });
    } else {
        {
            var x = localStorage.getItem("test");
            $scope.Error = JSON.parse(x);
        }
    }


});