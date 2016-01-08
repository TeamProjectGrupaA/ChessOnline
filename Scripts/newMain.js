$(document).ready(function() {
    var context = globalContext.context();
    var app = angular.module('myApp', ['ngRoute']);

    /*ROUTING*/

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "Scripts/templates/index.html",
                controller: "loginController"
            })
            .when('/main',{
                templateUrl: "Scripts/templates/main.html",
                controller: "mainController"
            })
            .when('/Profile', {
                templateUrl: "Scripts/templates/own.html",
                controller: "ownProfileController"
            })
            .when('/Profile/:id', {
                templateUrl: "Scripts/templates/profile.html",
                controller: "profileController"
            })
            .when('/Ranking', {
                templateUrl: "Scripts/templates/ranking.html",
                controller: "rankingController"
            })
            .when('/Settings', {
                templateUrl: "Scripts/templates/settings.html",
                controller: "settingsController"
            })
            .when('/Game', {
                templateUrl: "Scripts/templates/game.html",
                controller: "gameController"
            });
    });
    /**************************/
    app.factory('getUser',function($http){
        var user = JSON.parse(sessionStorage.getItem('user'));
        return{
            user:user
        }
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
        };
    });
    app.directive('customOnChange', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var onChangeHandler = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeHandler);
            }
        };
    });
    /*******************************************************************/

    /*Controllers*/

    /*LOGIN MODULE CONTROLLER*/

    app.controller('loginController',function($scope,$http,sharedProperties){
        $scope.login = "";
        $scope.logIn = function(e){
            var url = context.mainUrl();
            console.log("Login: " + $scope.login);
            $http.get(url + '/users/login/' + $scope.login)
                .success(function(data){
                    sessionStorage.setItem('login',$scope.login);
                    sessionStorage.setItem('user',JSON.stringify(data.id));
                    sharedProperties.setActualUser(data);
                })
                .error(function(){
                    e.defaultPrevented();
            })
        }

    });

    /*SETTINGS MODULE CONTROLLER*/

    app.controller('settingsController', function($scope, $window, $location, userService) {
        $scope.user = userService.user;
        $scope.saveSettings = function() {
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
        };
    });

    /*MAIN MODULE CONTROLLER*/

    app.controller('mainController', function($scope,$http, sharedProperties) {
        $http.get(context.mainUrl() + "/users/")
            .success(function(data){
                $scope.Users = data;
                console.log("USERS");
                console.log(data);
            });
        $http.get(context.mainUrl() + "/users/" + sessionStorage.getItem('user'))
            .success(function(data){
                $scope.actualUser = data;
                console.log("USER");
                console.log(data);
            });

        $http.get(context.mainUrl() + "/invites/sender/" + sessionStorage.getItem('user'))
            .success(function(data){
                $scope.invites = data;
                console.log("INVITES");
                console.log(data);
            });
        $http.get(context.mainUrl() + "/games/user/" + sessionStorage.getItem('user'))
            .success(function(data){
                $scope.games = data;
                console.log("GAMES");
                console.log(data);
            });
        $scope.giveDate = function(date){
            return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
        };
        $scope.getOpponentLogin = function(id){
            var opponentName = "";
            for(var i=0;i<$scope.Users.length;i++){
                if($scope.Users[i].id == id){
                    opponentName = $scope.Users[i].login;
                }
            }
            return opponentName
        };
        $scope.changeView = function($event, id) {
            sharedProperties.changeView($event, id);
        };
        var userId = sessionStorage.getItem("user");
        var login = sessionStorage.getItem("login");

        $scope.openUserProfile = function(user) {
            window.location.replace("#Profile/" + user.firstName);
            sharedProperties.setActualUser(user);
        };

    });

    /*RANKING MODULE CONTROLLER*/

    app.controller('rankingController',function($scope,$http){
        $http.get(context.mainUrl() + "/users/" + sessionStorage.getItem('user'))
            .success(function(data){
                $scope.actualUser = data;
                console.log(data);
            });
        $http.get(context.mainUrl() + "/users/")
            .success(function(data){
                $scope.Users = data;
                console.log(data);
            });
    });
    /***************************/

    /*OWN PROFILE MODULE CONTROLLER*/

    app.controller('ownProfileController', function($scope, $http,sharedProperties) {
        $http.get(context.mainUrl() + "/users/" + sessionStorage.getItem('user'))
            .success(function(data){
                $scope.actualUser = data;
                console.log(data);
            });
        $scope.myGame = true;
        $scope.myInvitation = true;
        $scope.changeView = function($event, id) {
            sharedProperties.changeView($event, id);
        };
    });

    /*PLAYER MODULE CONTROLLER*/

    app.controller('profileController', function($scope, $http,sharedProperties) {
        $http.get(context.mainUrl() + "/users/" + sessionStorage.getItem('user'))
            .success(function(data){
                $scope.actualUser = data;
                console.log(data);
            });
        $scope.message = "Hello!";
        $scope.changeView = function($event, id) {
            sharedProperties.changeView($event, id);
        };

    });

    /*GAME MODULE CONTROLLER*/

    app.controller('gameController', function($scope,$http) {
        $http.get(context.mainUrl() + "/users/" + sessionStorage.getItem('user'))
            .success(function(data){
                $scope.actualUser = data;
                console.log(data);
            });
        var socket = io();
        var resetBoardButton = document.getElementById('resetBoardButton');
        var savedChessBoard = localStorage.getItem('chess-board');

        function initiateNewBoard() {
            board.clear(false);
            board.start();
            game = new Chess();
            localStorage.setItem('chess-board', game.fen());
        }

        function handleMove(source, target) {
            var move = game.move({
                from: source,
                to: target
            });

            if (move) {
                socket.emit('move', move);
                localStorage.setItem('chess-board', game.fen());
                if (game.game_over()) {
                    alert('szach mat katole!');
                }
            } else {
                return 'snapback';
            }
        }

        var cfg = {
            draggable: true,
            position: 'start',
            onDrop: handleMove
        };

        board = new ChessBoard('board', cfg);

        if (savedChessBoard) {
            board.position(savedChessBoard, false);
            game = new Chess(savedChessBoard);
        } else {
            game = new Chess();
        }

        socket.on('move', function(msg) {
            game.move(msg);
            board.position(game.fen()); // fen is the board layout
            localStorage.setItem('chess-board', game.fen());
        });

        socket.on('reset', function() {
            initiateNewBoard();
        });

        resetBoardButton.addEventListener('click', function() {
            initiateNewBoard();
            socket.emit('reset');
        });
    });
    /*********************************************/

    app.service('sharedProperties', function() {
        var actualUser = null;

        return {
            getActualUser: function() {
                return actualUser;
            },
            setActualUser: function(value) {
                actualUser = value;
            },
            changeView: function($event, id) {
                $('#' + id).toggle(400, globalContext.context().toggleArrow($event.target));
            }
        };
    });
    angular.bootstrap(document, ['myApp']);

});