<?php
$title = $_POST['title'];
$desc = $_POST['desc'];

$host = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'dream_database';

$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

if(mysqli_connect_error()){
    die('Connection Error');
} else {    
  
}

?>