// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'satellizer', 'LocalStorageModule', 'ngCordova', 'starter.controllers',
  'starter.services', 'starter.Searchcontrollers', 'starter.Searchservice', 'starter.Storecontrollers', 'starter.Storeservice',
    'starter.Logcontrollers', 'starter.Logservice'])

.constant('authKey', 'myAuthToken')
    .constant('authApi', 'http://localhost:8100/#/')

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(['$provide', function ($provide) {

    $provide.decorator('$log', ['$delegate', function ($delegate) {
        // Keep track of the original debug method, we'll need it later.
        var origDebug = $delegate.debug;

        var getmyerror = $delegate.getmyerror;

        /*
         * Intercept the call to $log.debug() so we can add on
         * our enhancement. We're going to add on a date and
         * time stamp to the message that will be logged.
         */
        $delegate.error = function (Fetch_Error) {
            var args = [].slice.call(arguments);
            console.log(args);
            args[0] = [new Date().toString(), ': ', args[0]].join('');

            if (localStorage.getItem("test") != null) {
                var listError = JSON.parse(localStorage.getItem("test"));
            }

            if (!listError) {
                listError = [];
            }

            var item = {};
            item.errormsg = args[0];

            listError.push(item);
            localStorage.setItem("test", JSON.stringify(listError));


            // Send on our enhanced message to the original debug method.
            origDebug.apply(null, args);

        };

        $delegate.getmyerror = function () {
            return localStorage.getItem("test");

        };

        return $delegate;
    }]);
  }])


//.config(function (localStorageServiceProvider) {
//  localStorageServiceProvider
//      .setPrefix('Error')
//      .setNotify(true, true)
//})


.config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider, $httpProvider, $authProvider) {

    //$httpProvider.interceptors.push('TokenInterceptor');
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    localStorageServiceProvider.setPrefix('pate0357');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'AppCtrl'
    })

    // Each tab has its own nav history stack:

    .state('tab.Serch', {
        url: '/Serch',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-serch.html',
                controller: 'SerchCtrl'
            }
        }
    })

    .state('tab.find_store', {
        url: '/find_store',
        views: {
            'tab-chats': {
                templateUrl: 'templates/tab-find_store.html',
                controller: 'find_storeCtrl'
            }
        }
    })


    .state('tab.Log', {
        url: '/Log',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-Log.html',
                controller: 'LogCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/Serch');

    $authProvider.facebook({
        clientId: '1709670955933687',
        responseType: 'token',
        redirectUri: 'http://localhost:8100/#/'
    });
});