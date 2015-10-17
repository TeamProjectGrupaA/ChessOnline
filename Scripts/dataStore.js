var dataStore = dataStore || {};

dataStore = function(){
/*    var pawn = {};
    var jumper = {};
    var runner = {};
    var tower = {};
    var king = {};
    var queen = {};*/
    // private property
    var elements = [];
    // private method

    //public
    return{
        initBoardTable: function(){
            console.log('init table');
            elements = $(".stickClass");
        },
        tableCount: function(){
            console.log(elements.length);
        },
        getTableElement: function(index){
            return elements[index];
        }
    }
}();
