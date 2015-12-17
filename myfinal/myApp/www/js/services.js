angular.module('starter.services', [])

.factory('AuthFactory', function (localStorageService, authKey, $auth, authApi, $http, $log, $ionicPopup) {
    return {
        isLogged: function () {
            if ($auth.isAuthenticated() == true) {

                return true;
            } else if (localStorageService.get(authKey) != null) {

                return true;
            }

            return false;
        },
        login: function (user, password) {
            var credentials = {};
            credentials.username = user;
            credentials.password = password;


            if (credentials.username != "guest" && credentials.password.length >= 5) {

                localStorageService.set(authKey, credentials.username);
                return true;
            } else {
                if (credentials.username == "guest") {
                    $ionicPopup.alert({
                        title: 'Error',
                        content: 'Please enter another username!'
                    });

                    $log.error("please enter another username");

                } else {
                    $log.error("Please enter password more than 5 character");
                    $ionicPopup.alert({
                        title: 'Error',
                        content: 'Please enter another Password!'
                    });

                }
            }

            //response.headers()["token"]
            return false;
        },
        logout: function () {
            localStorageService.remove(authKey);
        },
        //        social_username: function () {
        //            var accessToken = localStorageService.get("satellizer_token");
        //
        //            $http.get("https://graph.facebook.com/v2.2/me", {
        //                params: {
        //                    access_token: accessToken,
        //                    fields: "id,name,picture",
        //                    format: "json"
        //                }
        //            }).
        //            then(function (result) {
        //                var profileData = result.data.name;
        //                console.log(profileData.name);
        //
        //
        //                //                return result.data.picture.data.url;
        //
        //            }, function (error) {
        //                alert("There was a problem getting your profile.");
        //                console.log(error);
        //            });
        //
        //        }
    }

});