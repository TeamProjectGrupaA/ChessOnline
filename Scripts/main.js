$(document).ready(function(){
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
    angular.bootstrap(document, ['myApp']);
});
