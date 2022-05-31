<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create account</title>
    <link rel="icon" href="images/player_right.png">
    <link rel="stylesheet" type="text/css" href="php-style.css">
</head>
<body>
    <img src="images/pacman1.png" id="pacman1">
    <img src="images/pacman2.png" id="pacman2">
    <div id="main">
        <h1 id="h1">Sign Up Here</h1>
        <form method="POST">
            <p id="txt">Login</p>
            <input type="text" placeholder="Enter your login here" name="login" id="login">
            <p id="txt">Username</p>
            <input type="text" placeholder="Enter your username here" name="username" id="username">
            <p id="txt">Password</p>
            <input type="password" placeholder="Enter your password here" name="password" id="password">
            <input type="submit" value="Sign up" id="btn">
        </form>
    </div>
</body>
</html>
<?php
session_start();
    if(isset($_POST["login"]) && isset($_POST["password"]) && isset($_POST["username"]))
    {
        if($_POST["login"] != "" && $_POST["password"] != "" && $_POST["username"] != "")
        {
            $login = $_POST["login"];
            $password = $_POST["password"];
            $username = $_POST["username"];
            $hash = password_hash($password, PASSWORD_DEFAULT);
            include 'database.php';

            mysqli_query($base, "INSERT INTO users (nick, login, password) VALUES ('$username', '$login', '$hash');");
            $_SESSION["zalogowany"] = true;
            $_SESSION["nick"] = $username;
            header("location: welcome.php");
        }
        else
        {
            echo "<div style='width:150px; height:90px; margin:auto; margin-top:-100px; text-align:center;'><h1 style='color:red; font-size:40px;'>". "Error". "</h1></div>";
        }
    }
?>