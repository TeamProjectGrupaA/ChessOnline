$(document).ready(function(){

});
var gameEngine = gameEngine || {};

gameEngine = function() {

    // private property

    var actualState;


    // private method


    // all returned is a public
    return {
        gameState :{
            Wait: 0,
            White: 1,
            Black: 2,
            End: 3
        },
        getGameState: function(){
            return actualState;
        },
        setGameState: function(value){
            actualState = value;
        },
        // initialization
        init: function() {
        },
        loadBoard: function(){
            var color = true;
            var el;
            var row;
            for(var i=0; i<8; i++){
                row = document.createElement('tr');
                if(i%2 ==0){
                    color = false;
                }
                else{
                    color = true;
                }
                for(var j=0; j<8; j++){
                    if(color){
                        el = document.createElement('td');
                        el.className="black stickClass";
                        color = false;
                        $(el).droppable({
                            accept: ".whiteItem ,.blackItem",
                            activeClass: "ui-state-hover",
                            hoverClass: "ui-state-active",
                            drop: function(ev, ui) {
                                var dropped = ui.draggable;
                                var droppedOn = $(this);
                                $(dropped).detach().css({top: 0,left: 0}).appendTo(droppedOn);
                                gameEngine.checkPlayer();
                            }
                        });
                        row.appendChild(el);
                    }
                    else{
                        el = document.createElement('td');
                        el.className="white stickClass";
                        $(el).droppable({
                            accept: ".whiteItem ,.blackItem",
                            activeClass: "ui-state-hover",
                            hoverClass: "ui-state-active",
                            drop: function(ev, ui) {
                                var dropped = ui.draggable;
                                var droppedOn = $(this);
                                $(dropped).detach().css({top: 0,left: 0}).appendTo(droppedOn);
                                gameEngine.checkPlayer();
                            }
                        });
                        color=true;
                        row.appendChild(el);
                    }
                }
                if (i < 2){
                    gameEngine.addWhiteItems(row);
                }
                if(i >= 6){
                    gameEngine.addBlackItems(row);
                }
                $('#boardTable').append(row);
            }
        },
        addWhiteItems: function(element){
            for(var j=0;j<8;j++){
                var item = document.createElement('div');
                item.className="myDiv whiteItem";
                $(item).draggable({
                    snap: ".stickClass",
                    snapMode: "inner",
                    revert: true
                });
                element.childNodes[j].appendChild(item);
            }
        },
        addBlackItems: function(element){
            for(var j=0;j<8;j++){
                var item = document.createElement('div');
                item.className="myDiv blackItem";
                $(item).draggable({
                    snap: ".stickClass",
                    snapMode: "inner",
                    revert: true
                });
                element.childNodes[j].appendChild(item);
            }
        },
        checkPlayer: function(){
            if(actualState == 1){
                alert("Teraz Czarne");
                gameEngine.setGameState(gameEngine.gameState.Black);
                $('.blackItem').draggable('enable');
                $('.whiteItem').draggable('disable');
            }
            else {
                if (actualState == 2) {
                    alert("Teraz Bia³e");
                    gameEngine.setGameState(gameEngine.gameState.White);
                    $('.whiteItem').draggable('enable');
                    $('.blackItem').draggable('disable');
                }
            }
        }

    }
}();