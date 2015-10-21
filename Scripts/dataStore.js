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
    var Users = [
        {"firstName":"John", "lastName":"Doe","ranking":2},
        {"firstName":"Anna", "lastName":"Smith","ranking":1},
        {"firstName":"Peter","lastName":"Jones","ranking":4},
        {"firstName":"Dawid","lastName":"Kostrzewski","ranking":3},
        {"firstName":"John", "lastName":"Doe","ranking":5},
        {"firstName":"Christina", "lastName":"Smith","ranking":7},
        {"firstName":"Peter","lastName":"Jones","ranking":8},
        {"firstName":"David","lastName":"Smith","ranking":9},
        {"firstName":"Hans", "lastName":"Klos","ranking":12},
        {"firstName":"Anna", "lastName":"Kurnikova","ranking":13},
        {"firstName":"Peter","lastName":"Czereśniak","ranking":10},
        {"firstName":"Pan","lastName":"Ktoś","ranking":11}
    ];
    //public
    return{
        getBoardElement: function(index){
            return boardElements[index];
        },
        addBoardElement: function(element){
            boardElements.push(element);
        },
        getUsers: function(){
            return Users;
        }

    }
}();
