angular.module('starter.services', [])

  .factory('AuthFactory', function(localStorageService, authKey,$auth, authApi, $http,$log,$ionicPopup) {
      return {
        isLogged : function()
        {
          if($auth.isAuthenticated()==true)
          {

            return true;
          }
          else if(localStorageService.get(authKey) != null ){

            return true;
          }
          console.log($auth.isAuthenticated());
          return false;
        },
        login : function(user,password){
          var credentials = {};
          credentials.username = user;
          credentials.password = password;


          if (credentials.username !="guest" && credentials.password.length >= 5){
            //$http.post(authApi+'Login', credentials).then(function(response)
            //{
              localStorageService.set(authKey,credentials.username );



            //});

            return true;
          }
          else if (credentials.username =="guest"){
            $ionicPopup.alert({
              title: 'Success',
              content: 'Please enter another username!'
            });

            $log.error("please enter another username");

          }
          //else if(localStorageService.get("satellizer_token"))
          //{
          //  $log.error("You already login with facebook");
          //  $ionicPopup.alert({
          //    title: 'Fail',
          //    content: 'Already login with facebook'
          //  });
          //
          //}
          else {
            $log.error("Please enter password more than 5 character");
            $ionicPopup.alert({
              title: 'Success',
              content: 'Please enter another Password!'
            });

          }

          //response.headers()["token"]
          return false;
        },
        logout : function(){
          localStorageService.remove(authKey);
        },
        social_username:function()
        {
          var accessToken=localStorageService.get("satellizer_token");

          $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: accessToken, fields: "id,name,picture", format: "json" }}).
          then(function(result) {
             var profileData = result.data;
            console.log(profileData);
            alert(result.data.picture.data.url);
//alert(result.data.image);
            console.log("init");
            //$scope.getProducts();

          }, function(error) {
            alert("There was a problem getting your profile.");
            console.log(error);
          });
        }
      }

    });

    //.factory('TokenInterceptor', function(localStorageService, authKey) {
    //
    //  return {
    //    request: function(config) {
    //      config.headers = config.headers || {};
    //      var token = localStorageService.get(authKey);
    //
    //      if (token != null) {
    //        config.headers['Token'] = token;
    //      }
    //      return config;
    //    },
    //
    //    response: function(response) {
    //      return response;
    //    }
    //  };
    //});

