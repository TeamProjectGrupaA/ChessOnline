var dataStore = dataStore || {};

dataStore = function(){
/*    var pawn = {};
    var jumper = {};
    var runner = {};
    var tower = {};
    var king = {};
    var queen = {};*/
    // private property
    var boardElements = [];
    // private method

    //public
    return{
        getBoardElement: function(index){
            return boardElements[index];
        },
        addBoardElement: function(element){
            boardElements.push(element);
        }

    }
}();
