$(document).ready(function () {
    var app = angular.module('myApp', ['ngRoute']);
    app.config(function($routeProvider){
        $routeProvider
            .when('/',{
            templateUrl: "Scripts/templates/main.html",
            controller: "mainController"})
             .when('/Profile',{
             templateUrl: "Scripts/templates/own.html",
             controller: "ownProfileController"})
            .when('/Profile/:id',{
                templateUrl: "Scripts/templates/profile.html",
                controller: "profileController"
            })
            .when('/Ranking',{
                templateUrl: "Scripts/templates/ranking.html",
                controller: "rankingController"
            })
            .when('/Settings',{
                templateUrl: "Scripts/templates,settings.html",
                controller: "settingsController"
            })

    });
    app.controller('mainController', function ($scope,sharedProperties) {
        $scope.Users = [
            {"firstName": "John", "lastName": "Doe", "ranking": 2,"wins": 5,"losts":1,"tie":"2"},
            {"firstName": "Anna", "lastName": "Smith", "ranking": 1},
            {"firstName": "Peter", "lastName": "Jones", "ranking": 4},
            {"firstName": "Dawid", "lastName": "Kostrzewski", "ranking": 3},
            {"firstName": "John", "lastName": "Doe", "ranking": 5},
            {"firstName": "Christina", "lastName": "Smith", "ranking": 7},
            {"firstName": "Peter", "lastName": "Jones", "ranking": 8},
            {"firstName": "David", "lastName": "Smith", "ranking": 9},
            {"firstName": "Hans", "lastName": "Klos", "ranking": 12},
            {"firstName": "Anna", "lastName": "Kurnikova", "ranking": 13},
            {"firstName": "Peter", "lastName": "Czere�niak", "ranking": 10},
            {"firstName": "Pan", "lastName": "Kto�", "ranking": 11}
        ];
        $scope.openUserProfile = function(user){
            window.location.replace("#Profile/" + user.firstName);
            sharedProperties.setActualUser(user);
        };

    });
    app.controller('ownProfileController', function ($scope,sharedProperties){
        $scope.myGame = true;
        $scope.myInvitation = true;
        $scope.changeView = function($event,id){
            sharedProperties.changeView($event,id);
        }
    });
    app.controller('profileController',function ($scope,sharedProperties){
        $scope.message = "Hello!";
        $scope.actualUser = sharedProperties.getActualUser();
        $scope.changeView = function($event,id){
            sharedProperties.changeView($event,id);
        }

    });
    app.service('sharedProperties', function () {
        var actualUser = null;

        return {
            getActualUser: function () {
                return actualUser;
            },
            setActualUser: function (value) {
                actualUser = value;
            },
            changeView: function($event,id){
                $('#'+id).toggle(400,globalContext.context().toggleArrow($event.target));
            }
        };
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
