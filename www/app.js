// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.auth',
  'ngCookies'
  // 'starter.userprofile'
]).run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'views/menu.html',
      controller: 'MenuCtrl'
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'views/user/home/home.html',
          controller: 'MenuCtrl'
        }
      },
      authenticate: true
    })
    // .state('app.userProfile', {
    //   url: '/profile',
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'views/user/profile/profile.html',
    //       controller: 'ProfileCtrl'
    //     }
    //   }
    // })
    .state('app.signup', {
      url: "/signup",
      views: {
        'menuContent': {
          templateUrl: "views/auth/signup.html",
          controller: 'SignUpCtrl'
        }
      }
    })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'views/auth/login.html',
          controller: 'LoginCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
  $httpProvider.responseInterceptors.push(function($q, $location) {
    return function(promise) {
      return promise.then(
        function(response) {
          return response;
        },
        function(response) {
          if (response.status === 401) {
            console.log('Rejected')
            $location.url('/login');
          }
          return $q.reject(response);
        }
      );
    };
  });
})
.run(function ($rootScope, $state, Auth) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    // Authenticated routes
    if (toState.authenticate && !Auth.isAuth()){
      event.preventDefault();
      // User isn’t authenticated
      $state.transitionTo('app.login');
    }
    // If they are logged in, don't let them go to signup or login pages
    if (Auth.isAuth() && (toState.name === 'app.signup' || toState.name === 'app.login')) {
      event.preventDefault();
      $state.transitionTo('app.home');
    }
  });
});
