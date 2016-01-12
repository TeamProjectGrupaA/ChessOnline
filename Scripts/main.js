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
            .when('/Registry',{
                templateUrl: "Scripts/templates/registry.html",
                controller: "registryController"
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
                templateUrl: "Scripts/templates/gameMain.html",
                controller: "gameMainController"
            })
            .when('/Game/:id',{
                templateUrl: "Scripts/templates/game.html",
                controller: "gameController"
            });
    });
    /**************************/
    app.factory('getUser',function(){
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
        $scope.logIn = function(){
            var url = context.mainUrl();
            console.log("Login: " + $scope.login);
            $http.get(url + '/users/login/' + $scope.login)
                .success(function(data){
                    console.log(data);
                    sessionStorage.setItem('login',$scope.login);
                    sessionStorage.setItem('user',JSON.stringify(data.id));
                    sharedProperties.setActualUser(data);
                    window.location.href="#main/";
                })
                .error(function(){
                    alert("Nie ma takiego użytkownika");
            })
        };
        $scope.logout = function(){
            sharedProperties.logout()
        };
        $scope.registryUser = function(){
            window.location.replace('#Registry/');
        }
    });

    /*REGISTRY MODULE CONTROLLER*/

    app.controller('registryController',function($scope){
        $scope.fname = "";
        $scope.lname = "";
        $scope.login = "";
        $scope.pass = "";
        $scope.user = {
            firstname: $scope.fname,
            lastname: $scope.lname,
            login: $scope.login,
            password: $scope.pass,
            wins: 0,
            losts: 0,
            ties: 0,
            points: 0
        };
        $scope.registryUser = function(){
            context.registryNewUser($scope.user,function(){
                window.location.replace("#/");
                window.location.reload();
            })
        }
    });

    /*SETTINGS MODULE CONTROLLER*/

    app.controller('settingsController', function($scope, $window, $location, userService, $http,sharedProperties) {
        $http.get(context.mainUrl() + "/users/" + sessionStorage.getItem('user'))
            .success(function(data){
                $scope.actualUser = data;
                console.log("USER");
                console.log(data);
            });
        $scope.user = $scope.actualUser;
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
        $scope.logout = function(){
            sharedProperties.logout()
        };
    });

    /*MAIN MODULE CONTROLLER*/

    app.controller('mainController', function($scope,$http, sharedProperties) {
        $scope.games = [];
        $scope.gameUser = [];
        $scope.gameOpp = [];
        $scope.Users = [];
        $scope.actualUser = {};
        $scope.invites = [];
        setTimeout(function(){ $http.get(context.mainUrl() + "/users/")
            .success(function(data){
                $scope.Users = data;
                console.log("USERS");
                console.log(data);
            }); }, 200);
        setTimeout(function(){ $http.get(context.mainUrl() + "/users/" + sessionStorage.getItem('user'))
            .success(function(data){
                $scope.actualUser = data;
                console.log("USER");
                console.log(data);
            }); }, 200);
        setTimeout(function(){ $http.get(context.mainUrl() + "/invites/reciver/" + sessionStorage.getItem('user'))
            .success(function(data){
                $scope.invites = data;
                console.log("INVITES");
                console.log(data);
            }); }, 200);
        setTimeout(function(){ $http.get(context.mainUrl() + "/games/user/" + sessionStorage.getItem('user'))
            .success(function(data){
                //$scope.gamesUser = data;
                console.log("GAMES USER");
                console.log(data);
                for(var i=0; i < data.length; i++){
                    $scope.games.push(data[i]);
                }
            }); }, 200);
        setTimeout(function(){ $http.get(context.mainUrl() + "/games/opp/" + sessionStorage.getItem('user'))
            .success(function(data){
                console.log("GAMES OPPONENT");
                console.log(data);
                //$scope.gameOpp = data;
                for(var i=0; i < data.length; i++){
                    $scope.games.push(data[i]);
                }
            }); }, 200);

        $scope.acceptInvite = function(invite){
            $scope.newGame={};
            var gameUrl = context.mainUrl() + "/games/";
            var invitesUrl = context.mainUrl() + "/invites/";
            var opponent = "";
            var user = "";
            var d = new Date();
            if(invite.senderId == sessionStorage.getItem('user')){
                opponent = invite.reciverId;
                user = invite.senderId;
            }
            else{
                opponent = invite.senderId;
                user = invite.reciverId;
            }
            var game = {
                fen: context.startFEN(),
                opponentId: opponent,
                userId: user,
                date: Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()),
                finished: false
            };
            console.log("INVITATION ACCEPTED");
            $http.post(gameUrl, game)
                .then(function(response){
                    console.log("CREATE NEW GAME");
                    console.log(response.data);
                    $scope.newGame = response.data;
                    invite.gameId = $scope.newGame.id;
                    invite.playable = true;
            }, function(response){
                console.log("NEW GAME CREATE ERROR");
            });
            setTimeout(function(){
                    $http.put(invitesUrl, invite)
                        .then(function(response){
                            console.log("UPDATE SUCCESSFULL");
                            console.log(invite);
                            invite = response.data;
                            window.location.reload();
                        }, function(response){
                            console.log('UPDATE ERROR!');
                        })
            }
            ,200);
        };
        $scope.giveMove = function(game){
            var chess = new Chess();
            chess.load(game.fen);
            if((chess.turn() == 'w' && $scope.actualUser.id == game.userId) || (chess.turn() == 'b' && $scope.actualUser.id == game.opponentId)){
                return "Mój";
            }
            else{
                return "Przeciwnika"
            }
        };
        $scope.giveDate = function(date){
            return new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
        };
        $scope.getOpponentLogin = function(game){
            var opponentName = "";
            if(game.opponentId == $scope.actualUser){
                for(var i=0;i<$scope.Users.length;i++){
                    if($scope.Users[i].id == game.userId){
                        opponentName = $scope.Users[i].login;
                    }
                }
            }
            else{
                for(i=0;i<$scope.Users.length;i++){
                    if ($scope.Users[i].id == game.opponentId){
                        opponentName = $scope.Users[i].login;
                    }
                }
            }
            return opponentName
        };
        $scope.inviteSender = function(id){
            for(var i=0;i<$scope.Users.length;i++){
                if($scope.Users[i].id == id){
                    return $scope.Users[i].login;
                }
            }
        };
        $scope.changeView = function($event, id) {
            sharedProperties.changeView($event, id);
        };
        var userId = sessionStorage.getItem("user");
        var login = sessionStorage.getItem("login");

        $scope.openUserProfile = function(game){
            if(game.opponentId || game.userId){
                if($scope.actualUser.id == game.opponentId){
                    sessionStorage.setItem('userProfile',JSON.stringify(game.userId));
                    window.location.replace("#Profile/" + game.userId);
                }
                else {
                    sessionStorage.setItem('userProfile',JSON.stringify(game.opponentId));
                    window.location.replace("#Profile/" + game.opponentId);
                }
            }
            else{
                sessionStorage.setItem('userProfile',JSON.stringify(game));
                window.location.replace("#Profile/" + game);
            }


        };
        $scope.letsPlay = function(game){
            sessionStorage.setItem("actualGame",JSON.stringify(game.id));
            window.location.replace("#Game/" + game.id);
        };
        $scope.logout = function(){
            sharedProperties.logout()
        };
    });

    /*RANKING MODULE CONTROLLER*/

    app.controller('rankingController',function($scope,$http,sharedProperties){
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
        $scope.openUserProfile = function(id){
            sessionStorage.setItem('userProfile',JSON.stringify(id));
            window.location.replace("#Profile/" + id);
        };
        $scope.logout = function(){
            sharedProperties.logout()
        };
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
        $scope.logout = function(){
            sharedProperties.logout()
        };
    });

    /*PLAYER MODULE CONTROLLER*/

    app.controller('profileController', function($scope, $http,sharedProperties) {
        $scope.actualUser = {};
        $scope.User = {};
        $http.get(context.mainUrl() + "/users/" + sessionStorage.getItem('user'))
            .success(function(data){
                $scope.actualUser = data;
                console.log(data);
            });
        $http.get(context.mainUrl() + "/users/" + sessionStorage.getItem('userProfile'))
            .success(function(data){
                $scope.User = data;
                console.log(data);
            });
        $scope.changeView = function($event, id) {
            sharedProperties.changeView($event, id);
        };
        $scope.logout = function(){
            sharedProperties.logout()
        };
        $scope.sendInvite = function(){
            var date = new Date();
            var invite = {
                creationTime: Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes()),
                reciverId: $scope.User.id,
                senderId: $scope.actualUser.id,
                playable: false,
                gameId: null
            };
            $http.post(context.mainUrl() + "/invites/", invite)
                .then(function(response){
                    console.log(response.data);
                    console.log("SEND INVITE");
                },function(response){
                    console.log('ERROR WITH SEND INVITE');
                });
            window.location.replace('#/main');
        }
    });

    /*GAME MODULE CONTROLLER*/
    app.controller('gameMainController',function($scope,$http,sharedProperties){
        $scope.logout = function(){
            sharedProperties.logout()
        };
        $scope.actualUser = {};
        $http.get(context.mainUrl() + "/users/" + sessionStorage.getItem('user'))
            .success(function(data){
                $scope.actualUser = data;
                console.log(data);
            });
    });
    app.controller('gameController', function($scope,$http,sharedProperties) {
        $scope.logout = function(){
            sharedProperties.logout()
        };
        $scope.User = {};
        $scope.actualUser = {};
        $scope.actualGame = {};
        $http.get(context.mainUrl() + "/users/" + sessionStorage.getItem('user'))
            .success(function(data){
                $scope.actualUser = data;
                console.log(data);
            });
        var gameId = JSON.parse(sessionStorage.getItem('actualGame'));
        setTimeout(function(){
            $http.get(context.mainUrl() + "/games/" + gameId)
                .then(function(response){
                    console.log("GET GAME");
                    $scope.actualGame = response.data;
                    console.log(response.data);
                })
        },200);
        var orientation = "";

        function handleMove(source, target) {

                var move = game.move({
                    from: source,
                    to: target
                });

                if (move) {
                    if (game.game_over()) {
                        setTimeout(function(){
                            var id = "";
                            if ($scope.actualUser.id == $scope.actualGame.userId){
                                id = $scope.actualGame.opponentId;
                            }
                            else if ($scope.actualUser.id == $scope.actualGame.opponentId){
                                id = $scope.actualGame.userId;
                            }
                           $http.get(context.mainUrl() + '/users/' + id).success(function(response){
                               $scope.User = response.data;
                               console.log(response.data);
                           })

                        },200);
                        if(game.turn() == "b"){
                            $scope.User.losts = $scope.User.losts + 1;
                            $scope.actualUser.wins = $scope.actualUser.wins + 1;
                            $scope.actualUser.points = $scope.actualUser.points + 3;
                        }
                        else if(game.turn() == 'w'){
                            $scope.actualUser.losts = $scope.User.losts + 1;
                            $scope.User.wins = $scope.User.wins + 1;
                            $scope.User.points = $scope.User.points + 3;
                        }
                        setTimeout(function(){
                            $http.put(context.mainUrl() + "/users/", $scope.actualUser).then(function(response){
                                console.log("UPDATE ACTUAL USER");
                                console.log(response.data);
                            },function(){
                                console.log("UPDATE ACTUAL USER FAILED!");
                            })
                        },200);
                        setTimeout(function(){
                            $http.put(context.mainUrl() + "/users/", $scope.User).then(function(response){
                                console.log("UPDATE USER");
                                console.log(response.data);
                            },function(){
                                console.log("UPDATE USER FAILED!");
                            })
                        },200);
                        setTimeout(function(){
                            $scope.actualGame.finished = true;
                            $http.put(context.mainUrl() + "/games/", $scope.actualGame).then(function(response){
                                console.log("GAME UPDATED");
                                console.log(response.data);
                            },function(){
                                console.log('ERROR WITH GAME UPDATE');
                            })
                        },200);
                        window.location.replace('#/main');
                        alert('Szach mat! Koniec Gry!');
                    }
                    else{
                            $scope.actualGame.fen = game.fen();
                            $http.put(context.mainUrl() + "/games/",$scope.actualGame)
                                .then(function(response){
                                    console.log("GAME UPDATE");
                                    console.log($scope.actualGame);
                                    window.location.replace("#/main");
                                    window.location.reload();
                                }, function(response){
                                    console.log("ERROR WITH GAME UPDATE");
                                });

                    }
                } else {
                    return 'snapback';
                }

        }
        function onDragStart(){
            if(game.turn() == 'w' && $scope.actualUser.id != $scope.actualGame.userId || game.turn() == 'b' && $scope.actualUser.id != $scope.actualGame.opponentId) {
                return false;
            }
        }
        setTimeout(function(){
            if ($scope.actualUser.id == $scope.actualGame.userId){
                orientation = "white";
            }
            else if($scope.actualUser.id == $scope.actualGame.opponentId){
                orientation = "black"
            }
            var cfg = {
                draggable: true,
                onDrop: handleMove,
                position: $scope.actualGame.fen,
                onDragStart: onDragStart,
                orientation: orientation
            };

            board = new ChessBoard('board', cfg);
            board.position($scope.actualGame.fen, false);
            game = new Chess($scope.actualGame.fen);
        },300);

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
            },
            logout: function(){
                sessionStorage.clear();
                window.location.replace('#/')
                window.location.reload();
            }
        };
    });
    angular.bootstrap(document, ['myApp']);

});