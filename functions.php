<?php

$db['save_dest'] = 'data/users.dta';

/* to trzeba skonfigurowac do uzycia bazy danych,
	w bazie musi byc tabela `users` z kolumnami
	`login`, `email`, `password` o type text */
	
/*
$db['save_dest'] = 'database';
$db['server'] = 'url';
$db['login'] = 'login';
$db['pass'] = 'haslo';
$db['db_name'] = 'nazwa_bazy';
*/

function register($login, $email, $password){
	global $db;
	
	if($db['save_dest'] == 'database')
		return register_db($login, $email, $password);
	else
		return register_file($login, $email, $password);
}

function login($login, $password){
	global $db;
	
	if($db['save_dest'] == 'database')
		return login_db($login, $password);
	else
		return login_file($login, $password);
}

function register_db($login, $email, $password){
	$data = db_query('SELECT * FROM users WHERE login='."'$login'");
	
	if($data->num_rows > 0){
		return false;
	}else{
		$res = db_query("INSERT INTO users (login, email, password) VALUES ('$login', '$email', '$password')");
		if($res)
			return true;
		else
			return false;
	}
	return false;
}

function register_file($login, $email, $password){
	global $db;
	
	if(strlen($login) < 3)
		return false;
	else if(preg_match(	
							'/^(?!(?:(?:\\x22?\\x5C[\\x00-\\x7E]\\x22?)|(?:\\x22?[^\\x5C\\x22]\\x22?)){255,})(?!(?:(?:\\x22?\\x5C[\\x00-\\x7E]\\x22?)|(?:\\x22?[^\\x5C\\x22]\\x22?)){65,}@)(?:(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2F-\\x39\\x3D\\x3F\\x5E-\\x7E]+)|(?:\\x22(?:[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x21\\x23-\\x5B\\x5D-\\x7F]|(?:\\x5C[\\x00-\\x7F]))*\\x22))(?:\\.(?:(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2F-\\x39\\x3D\\x3F\\x5E-\\x7E]+)|(?:\\x22(?:[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x21\\x23-\\x5B\\x5D-\\x7F]|(?:\\x5C[\\x00-\\x7F]))*\\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-+[a-z0-9]+)*\\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-+[a-z0-9]+)*)|(?:\\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\\]))$/iD', 
							$email
			) !== 1)
		return false;
	else if(strlen($password) < 3)
		return false;
	else if(file_check_if_user_exists($login))
		return false;
	else{
		//registering
		
		$handle = fopen($db['save_dest'], 'a+');
		if(fwrite($handle, "\r\n".$login.':'.$password))
			return (fclose($handle) || true);
		else
			return (fclose($handle) && false);
	}
}

function login_db($login, $password){
	$data = db_query('SELECT * FROM users');
	
	while($row = mysqli_fetch_row($data)){
		if($row[0] == $login)
			if($row[2] == $password)
				return true;
			else
				return false;
	}
	return false;
}

function login_file($login, $password){
	foreach(file_get_users() as $user){
		if($user[0] == $login){
			if($user[1] == $password)
				return true;
			else
				return false;
		}
	}
	return false;
}










//////////////////////////////////////////////////////////////

function file_get_users(){
	global $db;
	$data = file_get_contents($db['save_dest']);
	$data = explode("\r\n", $data);
	foreach($data as $d){
		$data1[] = explode(':',$d);
	}
	$data = $data1;
	
	return $data;
}

function file_check_if_user_exists($login){
	foreach(file_get_users() as $user){
		if($user[0] == $login){
			return true;
		}
	}
	return false;
}

function db_query($query){
	global $db;
	
	$connection = new mysqli($db['server'], $db['login'], $db['pass'], $db['db_name'])OR DIE('Could not connect');
	$ret = $connection->query($query);
	$connection->close();
	
	return $ret;
}