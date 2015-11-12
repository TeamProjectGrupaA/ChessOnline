var globalContext = globalContext || {};

globalContext.context = function(){
  return{
      toggleArrow: function(element){
          if($(element).hasClass('fa-angle-down')){
              $(element).removeClass('fa-angle-down').addClass('fa-angle-up');
          }
          else{
              $(element).removeClass('fa-angle-up').addClass('fa-angle-down');
          }
      }
  }
};
