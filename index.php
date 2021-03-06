<?php
session_start();

include 'functions.php';

if(isset($_POST['log']['submit'])){
	if(login(	
					$_POST['log']['login'], 
					$_POST['log']['password']
				)){
		$_SESSION['logged']['login'] = $_POST['log']['login'];
		echo '<font style="color: red;">Zalogowano</font><br />';
	}else{
		echo '<font style="color: red;">Wystąpił błąd</font><br />';
	}
}

if(isset($_POST['unlog'])){
	session_unset();
}

//sprawdzam czy juz zalogowano
if(isset($_SESSION['logged'])){
	echo 'Witaj '.$_SESSION['logged']['login']."<br />\r\n";
	echo '
			<form method="POST">
				<input type="submit" name="unlog" value="Wyloguj" />
			</form>';
}

if(isset($_POST['reg']['submit'])){
	if(register(	
					$_POST['reg']['login'], 
					$_POST['reg']['email'],
					$_POST['reg']['password']
				))
		echo '<font style="color: red;">Zarejestrowano</font>';
	else
		echo '<font style="color: red;">Wystąpił błąd</font>';
		
}


?>

<!DOCTYPE html>
<html>
<head>
    <title>Chess Online</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    <script src="Scripts/jquery.js"></script>
    <script src="Scripts/jquery-ui.min.js"></script>
    <script src="Scripts/bootstrap.min.js"></script>
    <link rel="stylesheet" href="Styles/jquery-ui.min.css">
    <link rel="stylesheet" href="Styles/bootstrap.min.css">
    <link rel="stylesheet" href="Styles/style.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

</head>
<body id="LoginBody">
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <img alt="Brand" src="./img/logoChess1.png" class="navbar-logo">
            </div>

            <form class="navbar-form navbar-right" role="login" method="POST">
                <div class="form-group">
                    <input type="text" class="form-control" name="log[login]" placeholder="Login">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="log[password]" placeholder="Password">
                </div>
                <button type="submit" id="login-submit" name="log[submit]" class="btn btn-default">Zaloguj</button>
            </form>
        </div>
    </nav>

    <div class="conatiner-fluid" id="content">
        <div class="col-sm-6 col-sm-push-5 col-sm-offset-1 col-xs-12">
            <div class="registration-form">
                <form method="POST">
                    <div class="form-group">
                        <label for="login">Login</label>
                        <input type="text" class="form-control" id="login" name="reg[login]" placeholder="Login">
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" class="form-control" id="email" name="reg[email]" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" name="reg[password]" placeholder="Password">
                    </div>
                    <button type="submit" class="btn btn-default" id="register-submit" name="reg[submit]">Zarejestruj</button>
                </form>
            </div>
        </div>
        <div class="col-sm-5 col-sm-pull-7 col-xs-12">
            <div class="registration-image-conatiner">
                <div class="registration-image"></div>
            </div>
        </div>        
    </div>

    <script>
        /*var loginButton = document.getElementById('login-submit');
        var registerButton = document.getElementById('register-submit');

        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href='main.html';
        });

        registerButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href='main.html';
        });*/
    </script>
</body>
</html>