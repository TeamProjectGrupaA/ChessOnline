/*var gameEngine = gameEngine || {};

gameEngine = function () {

    // private property

    var actualState;


    // private method


    // all returned is a public
    return {
        gameState: {
            Wait: 0,
            White: 1,
            Black: 2,
            End: 3
        },
        getGameState: function () {
            return actualState;
        },
        setGameState: function (value) {
            actualState = value;
        },
        // initialization
        init: function () {

        },
        loadBoard: function () {
            var color = true;
            var x = 0;
            var el;
            var row;
            for (var i = 0; i < 8; i++) {
                row = document.createElement('tr');
                for (var j = 0; j < 8; j++) {
                    el = document.createElement('td');
                    if (color) {
                        el.className = "black stickClass";
                    }
                    else {
                        el.className = "white stickClass";
                    }
                    $(el).data("position",{column: i,row:j,elementIndex:x});
                    $(el).droppable({
                        accept: ".whiteItem ,.blackItem",
                        activeClass: "ui-state-hover",
                        hoverClass: "ui-state-active",
                        drop: function (ev, ui) {
                            var dropped = ui.draggable;
                            var droppedOn = $(this);
                            $(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
                            gameEngine.checkPlayer();
                        }
                    });
                    dataStore.addBoardElement(el);
                    x++;
                    row.appendChild(el);
                    color = !color;
                }
                if(i == 1)
                    gameEngine.addWhiteItems(row);
                color = !color;
                $('#boardTable').append(row);
            }
        },
        changePosition: function(){
          alert('Klik :d')
        },
        addWhiteItems: function (element) {
            for (var j = 0; j < 8; j++) {
                var item = document.createElement('img');
                item.src = "./bierki/pionek_bialy.png";
                item.className = "myDiv";
                $(item).mousedown(function(){

                });
                $(item).draggable({
                    snap: ".stickClass",
                    snapMode: "inner",
                    revert: true,
                    start: function(ev,ui){
                        var parent = $(this).parent();
                        //alert($(parent).data("position").elementIndex);
                        gameEngine.checkAvailableFields($(parent).data("position").elementIndex);
                    },
                    stop: function(){
                        var parent = $(this).parent();
                        //alert($(parent).data("position").elementIndex);
                        gameEngine.disableAvailableFields($(parent).data("position").elementIndex);
                    }
                });
                element.childNodes[j].appendChild(item);
            }
        },
        addBlackItems: function (element) {
            for (var j = 0; j < 8; j++) {
                var item = document.createElement('div');
                item.className = "myDiv blackItem";
                $(item).draggable({
                    snap: ".stickClass",
                    snapMode: "inner",
                    revert: true
                });
                element.childNodes[j].appendChild(item);
            }
        },
        checkPlayer: function () {
            if (actualState == 1) {
                alert("Teraz Czarne");
                gameEngine.setGameState(gameEngine.gameState.Black);
                $('.blackItem').draggable('enable');
                $('.whiteItem').draggable('disable');
            }
            else {
                if (actualState == 2) {
                    alert("Teraz Białe");
                    gameEngine.setGameState(gameEngine.gameState.White);
                    $('.whiteItem').draggable('enable');
                    $('.blackItem').draggable('disable');
                }
            }
        },
        checkAvailableFields: function(index){
            var el = dataStore.getBoardElement(index+8);
            $(el).addClass('availableFields');
        },
        disableAvailableFields: function(index){
            var el = dataStore.getBoardElement(index+8);
            $(el).removeClass('availableFields');
        }


    }
}();*/