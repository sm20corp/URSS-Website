'use strict';

angular.module('urssApp').controller('loginCtrl', function($scope, $http, $window, $location) {
    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.login = function() {
        console.log("login result = " + "{" + $scope.username + ", " + $scope.password + "}");
        var isLogged = $window.localStorage['is-logged'];

        /*if (typeof isLogged == 'undefined') {
            $window.localStorage['is-logged'] = "true";
            isLogged = "true";
            console.log("undefined");
        } else if (isLogged == "true") {
            $window.localStorage['is-logged'] = "false";
            isLogged = "false";
            console.log("true");
        } else if (isLogged == "false") {
            $window.localStorage['is-logged'] = "true";
            isLogged = "true";
            console.log("false");
        }*/
        console.log("isLogged value :" + isLogged);

        $http({
            url: 'http://79.137.78.39:4242/auth/local',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'email': $scope.username,
                'password': $scope.password
            }
        }).then(function mySucces(response) {
            var accessToken = response.data.id;
            console.log("Success " + accessToken);
            $window.localStorage['is-logged'] = "true";
            $window.localStorage['access-token'] = accessToken;
            $location.path( "/main" );
        }, function myError(response) {

            console.log("Fail" + response.statusText);
        });
    };
    $scope.subscribe = function() {
        console.log("subscribe result = " + "{" + $scope.username + ", " + $scope.password + ", " + $scope.password_verify + "}");

        $http({
            url: 'http://79.137.78.39:4242/api/credentials/',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'email': $scope.username,
                'password': $scope.password
            }
        }).then(function mySucces(response) {
            var accessToken = response.data.id;
            console.log("Success " + accessToken);
            $window.localStorage['access-token'] = accessToken;
            $location.path( "/login" );
        }, function myError(response) {

            console.log("Fail" + response.statusText);
        });
    };
}).directive("passwordVerify", function() {
    return {
        require: "ngModel",
        scope: {
            passwordVerify: '='
        },
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(function() {
                var combined;

                if (scope.passwordVerify || ctrl.$viewValue) {
                    combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function(value) {
                if (value) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        var origin = scope.passwordVerify;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("passwordVerify", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("passwordVerify", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});
