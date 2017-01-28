'use strict';

angular.module('urssApp').controller('feedListUserCtrl', function($scope, $http, $window, $q, $sce, $location) {
  $scope.signOut = function () {
    $window.localStorage['is-logged'] = "false";
    $location.path( "/login" );
  }
});
