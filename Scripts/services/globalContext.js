var globalContext = globalContext || {};

globalContext.context = function(){
    var actualUser = {};
    var usersList = [];
    var sendedInvites = [];
    var recivedInvites = [];
    var mainUrl = "http://51.254.200.31:8080/ChessRests";
    //var mainUrl = "http://localhost:8080/ChessRests";
    var startFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  return{
      startFEN: function(){
          return startFEN;
      },
      mainUrl: function(){
        return mainUrl;
      },
      getActualUser: function(){
        return actualUser;
      },
      setActualUser: function(User){
        actualUser = User;
      },
      getActualUsersList: function(){
          return usersList;
      },
      setActualUsersList: function(Users){
          usersList = Users;
      },
      getSendedInvites: function(){
          return sendedInvites;
      },
      setSendedInvites: function(Invites){
          sendedInvites = Invites;
      },
      getRecivedInvites: function(){
          return recivedInvites;
      },
      setRecivedInvites: function(Invites){
          recivedInvites = Invites;
      },
      toggleArrow: function(element){
          if($(element).hasClass('fa-angle-down')){
              $(element).removeClass('fa-angle-down').addClass('fa-angle-up');
          }
          else{
              $(element).removeClass('fa-angle-up').addClass('fa-angle-down');
          }
      },
      getUserByLogin: function(login,element){
          var me = this;
          var url = mainUrl + "/users/login/"+login;
          $.get(url,function(data,status){
              if(status == "success"){
                  sessionStorage.setItem("user",JSON.stringify(data.id));
                  me.setActualUser(data);
                  console.log(data);
              }
              else{
                  element.preventDefault();
                  console.log("BLAD!");
              }
          });
      },
      getUserById: function(id){
          var me = this;
          var url = mainUrl + "/users/" + id;
          $.get(url,function(data,status){
              if(status == "success"){
                  me.setActualUser(data);
                  me.getUserInvitesBySenderId();
                  me.getUserInvitesByReciverId();
              }
              else{
                  console.log("BLAD!");
              }
          })
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
      },
      getUserInvitesBySenderId: function(){
          var me = this;
          var url = "http://localhost:8080/ChessRests/invites/sender/" + actualUser.id;
          $.get(url,function (data,status){
              if(status == "success"){
                  console.log(data);
                  me.setSendedInvites(data)
              }
              else{
                  console.log("Error");
              }
          })

      },
      getUserInvitesByReciverId: function(){
          var me = this;
          var url = "http://localhost:8080/ChessRests/invites/reciver/" + actualUser.id;
          $.get(url,function (data,status){
              if(status == "success"){
                  console.log(data);
                  me.setRecivedInvites(data)
              }
              else{
                  console.log("Error");
              }
          })

      }
  }
};
