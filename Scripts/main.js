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
                templateUrl: "Scripts/templates/settings.html",
                controller: "settingsController"
            })
            .when("/Game",{
                templateUrl:"Scripts/templates/game.html",
                controller: "gameController"
            })

    });
    app.factory('userService', function() {
        var user = {
            firstName: "Ala",
            lastName: "Kot",
            email: "ala@op.pl",
            password: "kot",
            avatar: "hetman_bialy.png"
        };
        var saveUser = function() {
            console.log(user);
        };
        
        var deleteUser = function() {
            user.firstName = "";
            user.lastName = "";
            user.email = "";
            user.password = "";
            user.avatar = "";
        };
        return {
            user: user,
            saveUser: saveUser,
            deleteUser: deleteUser
        }
    });
    app.directive('customOnChange', function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeHandler = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeHandler);
            }
        };
    });
    app.controller('settingsController', function ($scope, $window, $location, userService) {
        $scope.user = userService.user;
        $scope.saveSettings = function () {
            userService.saveUser();
        };
        $scope.deleteUser = function() {
           if ($window.confirm("Czy chcesz usunąć konto?")) {
               userService.deleteUser();
               $window.location.href = "/index.html";  
           }       
         };
        $scope.fileUpload = function(event) {
            $scope.$apply(function() {
                userService.user.avatar = event.target.files[0].name;            
            });
        }
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
        };
        $scope.playGame= function(){
            window.location.replace("#Game");
        }

    });

    app.controller('gameController',function($scope){

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
