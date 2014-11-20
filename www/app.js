angular.module('starter', [
  'ionic',
  'starter.controllers',
  'authView',
  'vendorProfile',
  'vendorSignup',
  'userprofile',
  'userDashboard',
  'vendorDashboard',
  'ngCordova',
  'auth'//,
  // 'usermap'
]).run(function($ionicPlatform, $cordovaSplashscreen, $http, Auth, $state) {
  $http({
    method: 'GET',
    url: config.baseUrl + '/test'
  })
  .then(function(response) {
    Auth.isAuth = true;
    $state.transitionTo('app.home');
    $cordovaSplashscreen.hide();
  })
  .catch(function(error) {
    Auth.isAuth = false;
    $cordovaSplashscreen.hide();
  });
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
      onEnter: function(Auth, $state) {
        if (!Auth.isVendor) {
          $state.transitionTo('app.usermap');
          return;
        }
        // $state.transitionTo('app.vendormap'); activate when vendor map is done
        $state.transitionTo('app.vendorHome');
      },
      authenticate: true
    })
    .state('app.userProfile', {
      url: '/user/profile',
      authenticate: true,
      views: {
        'menuContent': {
          templateUrl: 'views/user/profile/profile.html',
          controller: 'UserProfileCtrl'
        }
      }
    })
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
    .state('app.vendorSignup', {
      url: '/user/vendorsignup',
      authenticate: true,
      views: {
        'menuContent': {
          templateUrl: 'views/user/vendorSignup/vendorSignup.html',
          controller: 'VendorSignupCtrl'
        }
      }
    })
    .state('app.vendorHome', {
      url: '/vendor/home',
      authenticate: true,
      views: {
        'menuContent': {
          templateUrl: 'views/vendor/dashboard/home.html',
          controller: 'VendorDashboardCtrl'
        }
      }
    })
    .state('app.usermap', {
      url: '/user/map',
      authenticate: true,
      views: {
        'menuContent': {
          templateUrl: 'views/user/dashboard/map/map.html',
          controller: 'UserDashboardCtrl'
        }
      }
    })
    .state('app.userlist', {
      url: '/user/list',
      authenticate: true,
      views: {
        'menuContent': {
          templateUrl: 'views/user/dashboard/vendorList/list.html',
          controller: 'UserDashboardCtrl'
        }
      }
    })
    .state('app.signup', {
      url: "/auth/signup",
      views: {
        'menuContent': {
          templateUrl: "views/auth/signup.html",
          controller: 'AuthCtrl'
        }
      }
    })
    .state('app.login', {
      url: '/auth/login',
      views: {
        'menuContent': {
          templateUrl: 'views/auth/login.html',
          controller: 'AuthCtrl'
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
  $httpProvider.responseInterceptors.push(function($q, $location) {
    return function(promise) {
      return promise.then(
        function(response) {
          return response;
        },
        function(response) {
          if (response.status === 401) {
            $location.url('/app/auth/login');
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
