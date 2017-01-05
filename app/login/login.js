'use strict';

angular.module('urssApp.login', ['ngRoute']).controller('loginCtrl', function($scope, $http) {
    $scope.login = function() {
      console.log("login result = " + "{"  + $scope.username + ", " + $scope.password + "}");
    };
    $scope.subscribe = function() {
      console.log("login result = " + "{"  + $scope.username + ", " + $scope.password + ", " + $scope.passwordConfirmation + "}");
      $http({
        url : 'http://137.74.166.198:4242/api/credentials/',
        method : "POST",
        headers: {
          'Content-Type': 'application/json'},
        data: {
          'username': 'test',
          'password': 'test'
        }
    }).then(function mySucces(response) {
        console.log(response.data);
    }, function myError(response) {
        console.log(response.statusText);
    });
    };
});
