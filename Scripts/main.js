$(document).ready(function(){
    $('#myDiv').draggable({
        snap: ".stickClass",
        snapMode: "inner",
        revert: true

    });
    $('td').droppable({
        accept: "#myDiv",
        activeClass: "ui-state-hover",
        hoverClass: "ui-state-active",
        drop: function(ev, ui) {
            var dropped = ui.draggable;
            var droppedOn = $(this);
            $(dropped).detach().css({top: 0,left: 0}).appendTo(droppedOn);
        }

    });
});
