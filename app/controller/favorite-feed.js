/**
   * @memberof app
   * @ngdoc controller
   * @name favoriteFeedCtrl
   * @param $scope {service} Controller scope
   * @param $http {service} Http service
   * @param $window {service} Reference to browser window object
   * @param $q {service} A service that helps you run functions asynchronously and use their return values (or exceptions) when they are done processing
   * @param $sce {service} Service that provides Strict Contextual Escaping services to AngularJS
   * @param $location {service} Service that parses the URL in the browser address bar (based on the window.location) and makes the URL available to your application
   */

'use strict';

angular.module('urssApp').controller('favoriteFeedCtrl', function($scope, $http, $window, $q, $sce, $location) {
  $scope.username = "Username";
  var token;
  var userId;
  $scope.articles = [];
  /**
    * Init function when the page is loading
    * we get the userid of the user and the token
    * and we make an http request get to get user info
    * @memberof feedListUserCtrl
    */
  var init = function() {
      $scope.username = $window.localStorage['username'];
      token = $window.localStorage['access-token'];
      userId = $window.localStorage['user-id'];

  }
  init();

  /**
    * signOut function
    * we change login state and change the page to login
    * @memberof feedListUserCtrl
    */
  $scope.signOut = function() {
      $window.localStorage['is-logged'] = "false";
      $location.path("/login");
  }
});
