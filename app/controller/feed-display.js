'use strict';

angular.module('urssApp').controller('feedListCtrl', function($scope, $http, $window, $q, $sce) {
    $scope.articles = [];

    $scope.test = function(newSelectedArticle) {
      $scope.selectedArticle = $sce.trustAsResourceUrl(newSelectedArticle);
    }

    $scope.getFeed = function() {
      console.log($scope.articles.length);
        if ($scope.feedUrl) {
            console.log($scope.feedUrl);
            $http({
                url: 'http://79.137.78.39:4242/api/feeds/fromURL',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    'url': $scope.feedUrl,
                }
            }).then(function mySucces(response) {
                var feedId = response.data.id;
                console.log("success{" + feedId + "}");
                getFeedArticles(feedId);

            }, function myError(response) {

                console.log("Fail" + response.statusText);
            });
        }
    }

    function getFeedArticles(feedId) {
        var url = "http://79.137.78.39:4242/api/feeds/" + feedId;
        $http({
            url: url,
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                'url': $scope.feedUrl,
            }
        }).then(function mySucces(response) {
            var articlesIdArray = response.data.articles;
            console.log(articlesIdArray);
            getArticlesInfo(articlesIdArray);

        }, function myError(response) {

            console.log("Fail" + response.statusText);
        });
    }

    function getArticlesInfo(articlesIdArray) {
        var arr = [];

        for (var a = 0; a < articlesIdArray.length; ++a) {
          var url = "http://79.137.78.39:4242/api/articles/" + articlesIdArray[a];
            arr.push($http({
                url: url,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
        }

        $q.all(arr).then(function(ret) {
          $scope.articles = ret;
          console.log("finished" + $scope.articles);

        });
    }
});
