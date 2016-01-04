$(document).ready(function () {
    var app = angular.module('myApp', ['ngRoute']);
    app.config(function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl: "Scripts/templates/login.html",
                controller: "loginController"})
            .when('/Registry',{
                templateUrl: "Scripts/templates/registry.html",
                controller: "registryController"
            })


    });
    app.controller("loginController",function($scope){
        $scope.logIn=function(){
            var user = $("#inputLogin").val();
            globalContext.context().getUserByLogin(user);
        };
        $scope.registry=function(){
            window.location.replace("#Registry");
        }
    });
    app.controller("registryController",function($scope){
        $scope.registryUser=function(){
            var name = $("#firstnameInput").val();
            var surname = $("#lastnameInput").val();
            var login = $("#inputLogin").val();
            var pass = $("#inputPassword").val();

            var user = {
                "firstname": name,
                "lastname":surname,
                "birthdate": 123456789,
                "login":login,
                "password":pass
            };
            //console.log(user);
            globalContext.context().registryNewUser(user,function(){
                window.location.replace("/ChessOnline/#/");
            });
        }
    });
    angular.bootstrap(document, ['myApp']);
});
