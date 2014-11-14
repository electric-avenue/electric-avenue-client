angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.login',
  'starter.signup',
  'vendorProfile',
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
      templateUrl: 'views/menu/menu.html',
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
    .state('app.vendorProfile', {
      url: '/vendor/profile',
      authenticate: true,
      views: {
        'menuContent': {
          templateUrl: 'views/vendor/profile/profile.html',
          controller: 'VendorProfileCtrl'
        }
      }
    })
    // temporary
    .state('app.usermap', {
      url: '/user/map',
      authenticate: true,
      views: {
        'menuContent': {
          templateUrl: 'views/user/home/home.html',
          controller: 'MenuCtrl'
        }
      }
    })
    // temporary
    .state('app.userlist', {
      url: '/user/list',
      authenticate: true,
      views: {
        'menuContent': {
          templateUrl: 'views/user/home/home.html',
          controller: 'MenuCtrl'
        }
      }
    })
    .state('app.signup', {
      url: "/signup",
      views: {
        'menuContent': {
          templateUrl: "views/auth/signup/signup.html",
          controller: 'SignUpCtrl'
        }
      }
    })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'views/auth/login/login.html',
          controller: 'LoginCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
  /*
  *  DEVELOPMENT ONLY - NOT NEEDED FOR IONIC MOBILE BUILD
  */
  $httpProvider.defaults.withCredentials = true;
  /*
  *  END DEVELOPMENT ONLY
  */
  $httpProvider.responseInterceptors.push(function($q) {
    return function(promise) {
      return promise.then(
        function(response) {
          return response;
        },
        function(response) {
          if (response.status === 401) {
            $state.transitionTo('app.login');
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
    if (toState.authenticate && !Auth.isAuth){
      event.preventDefault();
      // User isn’t authenticated
      $state.transitionTo('app.login');
    }
    // If they are logged in, don't let them go to signup or login pages
    if (Auth.isAuth && (toState.name === 'app.signup' || toState.name === 'app.login')) {
      event.preventDefault();
      $state.transitionTo('app.home');
    }
  });
});
