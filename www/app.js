angular.module('starter', [
  'ionic',
  'starter.controllers',
  'authView',
  'vendorSignup',
  'userprofile',
  'userpassword',
  'userDashboard',
  'vendorDashboard',
  'ngCordova',
  'angularPayments',
  'payments',
  'ui.utils.masks',
  'auth'
]).run(function($ionicPlatform, $cordovaSplashscreen, $http, Auth, $state) {
  $http({
    method: 'GET',
    url: config.baseUrl + '/test'
  })
  .then(function(response) {
    Auth.isAuth = true;
    $state.go('app.home');
    if ($cordovaSplashscreen) {
       setTimeout(function() {
         $cordovaSplashscreen.hide();
       }, 1500);
    }
  })
  .catch(function(error) {
    Auth.isAuth = false;
     if ($cordovaSplashscreen) {
       $cordovaSplashscreen.hide();
     }
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
    .state('main', {
      url: "/main",
      templateUrl: "views/main.html",
      controller: 'AuthCtrl'
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
          templateUrl: 'views/profile/profile.html',
          controller: 'UserProfileCtrl'
        }
      }
    })
    .state('app.paymentProfile', {
      url: '/user/payments',
      authenticate: true,
      views: {
        'menuContent': {
          templateUrl: 'views/user/paymentProfile/payments.html',
          controller: 'PaymentsCtrl'
        }
      }
    })
    .state('app.changePassword', {
      url: '/user/changepassword',
      authenticate: true,
      views: {
        'menuContent': {
          templateUrl: 'views/user/changePassword/changePassword.html',
          controller: 'ChangePasswordCtrl'
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
          templateUrl: 'views/vendor/dashboard/home/home.html',
          controller: 'VendorDashboardCtrl'
        }
      }
    })
    .state('app.vendorMap', {
      url: '/vendor/map',
      authenticate: true,
      views: {
        'menuContent': {
          templateUrl: 'views/vendor/dashboard/map/map.html',
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
    .state('signup', {
      url: "/auth/signup",
      templateUrl: "views/auth/signup.html",
      controller: 'AuthCtrl'
    })
    .state('login', {
      url: '/auth/login',
      templateUrl: 'views/auth/login.html',
      controller: 'AuthCtrl'
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
            $location.url('/main');
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
      $state.go('main');
    }
    // If they are logged in, don't let them go to signup or login pages
    if (Auth.isAuth && (toState.name === 'signup' || toState.name === 'login')) {
      event.preventDefault();
      $state.transitionTo('app.home');
    }
  });
});
