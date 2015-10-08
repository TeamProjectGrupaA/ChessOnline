$(document).ready(function(){
    gameEngine.loadBoard();
    $('.whiteItem').draggable('disable');
    $('.blackItem').draggable('disable');
    $('#startGame').click(function(){
        gameEngine.setGameState(gameEngine.gameState.White);
        console.log('State: ' + gameEngine.getGameState());
        $('.whiteItem').draggable('enable');
    })



});
