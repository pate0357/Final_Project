angular.module('starter.services', [])

.factory('AuthFactory', function (localStorageService, authKey, $auth, authApi, $http, $log, $ionicPopup) {
    return {
        isLogged: function () {
            if ($auth.isAuthenticated() == true) {

                return true;
            } else if (localStorageService.get(authKey) != null) {

                return true;
            } else {
                return false;
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
                        content: 'Please enter another username except guest!'
                    });

                    $log.error("please enter another username except Guest");

                } else {
                    $log.error("Please enter password more than 5 character long");
                    $ionicPopup.alert({
                        title: 'Error',
                        content: 'Please enter password more than 5 character long!'
                    });

                }
            }

            //response.headers()["token"]
            return false;
        },
        logout: function () {
            localStorageService.remove(authKey);
        },
        social_username: function (token) {


            $http.get("https://graph.facebook.com/v2.2/me", {
                params: {
                    access_token: token,
                    fields: "id,name,picture",
                    format: "json"
                }
            }).
            then(function (result) {
                var profileData = result.data.name;
                $ionicPopup.alert({
                    title: 'Welcome',
                    content: profileData
                });




            }, function (error) {
                alert("There was a problem getting your profile.");
                console.log(error);
            });

        }
    }

});