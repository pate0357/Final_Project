/**
 * Created by Harsh on 2015-12-13.
 */
angular.module('starter.Logcontrollers', [])




.controller('LogCtrl', function ($scope, AuthFactory, $rootScope, $log, localStorageService) {


    if (AuthFactory.isLogged() == false) {
        $rootScope.$broadcast('showLoginModal', $scope, null, function () {
            var x = localStorage.getItem("test");
            $scope.Error = JSON.parse(x);

            //            var x = $log.getmyerror();
            //            $scope.Error = JSON.parse(x);
        });
    } else {
        {

            //      $scope.details = localStorage.getItem("test");

            var x = localStorage.getItem("test");

            //            var x = $log.getmyerror();
            $scope.Error = JSON.parse(x);
        }
    }


});