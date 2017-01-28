'use strict';
angular.module('urssApp', ['ngRoute']).config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {

  $routeProvider
  .when("/", {
      templateUrl : "production/home.html",
      controller:'feedListCtrl'
  })
  .when("/login", {
      templateUrl : "production/login.html",
      controller:'loginCtrl'
  })
  .when("/subscribe", {
      templateUrl : "production/subscribe.html",
      controller:'loginCtrl'
  })
  .when("/main", {
      templateUrl : "production/main.html",
      controller:'feedListUserCtrl'
  })
  .when("/unread", {
      templateUrl : "production/unread.html"
  })
  .when("/favorite", {
      templateUrl : "production/favorite.html"
  })
  .otherwise('/');

}]).
run(function($rootScope, $location, $window) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    console.log(next.templateUrl);
    var data = $window.localStorage['access-token'];
    if (typeof data != 'undefined') {
      console.log(data);
    }
    var isLogged = $window.localStorage['is-logged'];
    if (isLogged && isLogged == 'false') {
      if (next.templateUrl == "production/main.html" || next.templateUrl == "production/favorite.html"
      || next.templateUrl == "production/unread.html") {
        $location.path( "/login" );
        next.templateUrl = "production/login.html"
      }
    }
    else if (isLogged && isLogged == 'true') {
      if (next.templateUrl == "production/login.html" || next.templateUrl == "production/subscribe.html"
      || next.templateUrl == "production/home.html") {
        $location.path( "/main" );
        next.templateUrl = "production/main.html"
      }
    }
  })
});
