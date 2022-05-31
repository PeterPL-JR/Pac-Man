<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="icon" href="images/player_right.png">
    <link rel="stylesheet" type="text/css" href="php-style.css">
</head>
<body>
    <img src="images/pacman1.png" id="pacman1">
    <img src="images/pacman2.png" id="pacman2">
    <div id="main">
        <h1 id="h1">Login Here</h1>
        <form method="POST">
            <p id="txt">Login</p>
            <input type="text" placeholder="Enter your login here" name="login" id="login">
            <p id="txt">Password</p>
            <input type="password" placeholder="Enter your password here" name="password" id="password">
            <input type="submit" value="Login" id="btn">
        </form>
    </div>
</body>
</html>
<?php
session_start();
    if(isset($_POST["login"]) && isset($_POST["password"]))
    {
        if($_POST["login"] != "" && $_POST["password"] != "")
        {
            $login = $_POST["login"];
            $password = $_POST["password"];
            include 'database.php';
            $query = mysqli_query($base, "SELECT login, password FROM users;");
            while($row = mysqli_fetch_assoc($query))
            {
                $hash = $row["password"];
                if($login == $row["login"] && password_verify($password, $hash))
                {
                    $query2 = mysqli_query($base, "SELECT users.nick FROM users WHERE users.login = '$login' AND users.password = '$hash';");
                    $user = mysqli_fetch_assoc($query2);
                    $name = $user["nick"];
                    $_SESSION["zalogowany"] = true;
                    $_SESSION["nick"] = $name;
                    header("location: welcome.php");
                }
            }
        }
            echo "<div style='width:150px; height:90px; margin:auto; margin-top:-120px; text-align:center;'><h1 style='color:red; font-size:40px;'>". "Error". "</h1></div>";
    }
?>