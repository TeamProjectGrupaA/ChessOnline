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
      },
      getUserByLogin: function(login){
          var url = "http://localhost:8080/ChessRests/users/login/"+login;
          $.get(url,function(data,status){
              if(status == "success"){
                  console.log(data);
                  window.location.replace("main.html");
              }
              else{
                  console.log("BLAD!");
              }
          });
      },
      registryNewUser: function(user,callback){
          var url = "http://localhost:8080/ChessRests/users";
          $.ajax({url: url, method: "POST", dataType: "json", contentType: 'application/json', data: JSON.stringify(user), success: function(data,status){
              console.log(status);
              console.log(data);
              if(status == "success" || status == "nocontent"){
                  console.log("Dodano Usera");
                  if(callback){
                      callback();
                  }
              }
              else{
                  console.log("Error");
              }
          }});
      }
  }
};
