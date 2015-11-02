$(document).ready(function () {
    var app = angular.module('myApp', ['ngRoute']);
    app.config(function($routeProvider){
        $routeProvider
            .when('/',{
            templateUrl: "Scripts/templates/main.html",
            controller: "mainController"})
             .when('/Profile',{
             templateUrl: "Scripts/templates/own.html",
             controller: "ownProfilController"})

    });
    app.controller('mainController', function ($scope) {
        $scope.Users = [
            {"firstName": "John", "lastName": "Doe", "ranking": 2},
            {"firstName": "Anna", "lastName": "Smith", "ranking": 1},
            {"firstName": "Peter", "lastName": "Jones", "ranking": 4},
            {"firstName": "Dawid", "lastName": "Kostrzewski", "ranking": 3},
            {"firstName": "John", "lastName": "Doe", "ranking": 5},
            {"firstName": "Christina", "lastName": "Smith", "ranking": 7},
            {"firstName": "Peter", "lastName": "Jones", "ranking": 8},
            {"firstName": "David", "lastName": "Smith", "ranking": 9},
            {"firstName": "Hans", "lastName": "Klos", "ranking": 12},
            {"firstName": "Anna", "lastName": "Kurnikova", "ranking": 13},
            {"firstName": "Peter", "lastName": "Czereœniak", "ranking": 10},
            {"firstName": "Pan", "lastName": "Ktoœ", "ranking": 11}
        ];
    });
    app.controller('ownProfilController', function ($scope){
        $scope.myGame = true;
        $scope.myInvitation = true;
        $scope.changeView = function($event,id){
            $('#'+id).toggle(400,globalContex.context().toggleArrow($event.target));
        }
    });
    angular.bootstrap(document, ['myApp']);
});
/*
 //board = ChessBoard('board',cfg);
 $('#newGameButton').click(function(){

 });
 gameEngine.loadBoard();
 var app = angular.module('myApp', []);
 app.controller('leftPanelController', function($scope) {
 $scope.Users = dataStore.getUsers();
 $scope.actualUser = $scope.Users[0];
 $scope.sorting="lastName";
 });

 */
