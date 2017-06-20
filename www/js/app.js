/*
* Develop by: Guilherme Corrêa
* Angular JS Configuration for APP
*/

'use strict';

var app = angular.module('feed', ['ionic', 'ngRoute', 'ngAnimate', 'ngCordova', 'cgNotify','mui']);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when("/", { templateUrl: "views/descricao.html", controller:"pageController"})
        .when("/conteudo", { templateUrl: "views/conteudo.html", controller:"conteudoController"})
        .otherwise({ redirectTo: '/' });

    //configura o httpProvider RESPONSE interceptor, usado para exibir uma mensagem de erro caso o servidor retorne algum erro
    $httpProvider.interceptors.push('feederro');
}]);

app.factory('feederro', ['$q', function ($q) {

    return function (promisse) {

        return promisse.then(function (response) {
            return response;
        },
            function (response) {
                var $data = response.data;
                var $error = $data.error;
                console.error($error);
                if ($error && $error.text) {
                    $.notify("ERROR: " + $error.text, "error");
                } else {
                    if (response.status === 404) {
                        $.notify("Erro ao acessar o servidor, página não encontrada: " + $error.text, "error");
                    } else {
                        console.error($error.text);
                        $.notify("ERROR, see log console", "error");
                    }
                }
                return $q.reject(response);
            });
    };
}]);



app.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded';
  $httpProvider.defaults.headers.put['Content-Type'] =  'application/x-www-form-urlencoded';
  $httpProvider.defaults.headers.patch = {};
});



