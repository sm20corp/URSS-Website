'use strict';

// Declare app level module which depends on views, and components
angular.module('urssApp', [
  'ngRoute',
  'urssApp.login',
]).
config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {
/*  $httpProvider.defaults.headers.common = {};
 $httpProvider.defaults.headers.post = {};
 $httpProvider.defaults.headers.put = {};
 $httpProvider.defaults.headers.patch = {};*/
  $routeProvider
  .when("/", {
      templateUrl : "production/home.html"
  })
  .when("/login", {
      templateUrl : "production/login.html"
  })
  .when("/subscribe", {
      templateUrl : "production/subscribe.html"
  })
  .when("/main", {
      templateUrl : "production/main.html"
  })
  .when("/unread", {
      templateUrl : "production/unread.html"
  })
  .when("/favorite", {
      templateUrl : "production/favorite.html"
  })
  .otherwise('/');

}]).
run(function($rootScope, $location) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    console.log(next.templateUrl);
  })
});
