/*
* Develop by: Guilherme Corrêa
* Angular JS Configuration for APP
*/
'use strict';

var app = app || {};

app.controller('pageController', ['$scope', '$http','$location', pageController]);

function pageController($scope, $http, $location) {

  $scope.rssFeed = "http://globoesporte.globo.com/ESP/Noticia/Rss/0,,AS0-4400,00.xml";

  var jsonFeed = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'" + $scope.rssFeed + "'&format=json";

  $http.get(jsonFeed).success(function (data) {
    $scope.feed = data.query.results.rss;
  });

  // The function triggered by 'load feed'
  $scope.ChangeFeed = function () {
    // Change the RSS feed
    $scope.rssFeed = $scope.InputRssFeed;
    // Define the JSON feed for fetching the RSS feed
    jsonFeed = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'" + $scope.rssFeed + "'&format=json";
    // Actually fetch the feed
    $http.get(jsonFeed).success(function (data) {
      $scope.feed = data.query.results.rss;
    });
  };
  $scope.abrirConteudo = function (link) {
      util.data.conteudo = link;
      $location.url('/conteudo');
  }

  $scope.voltar = function () {
    $location.url('/');
  }

}

