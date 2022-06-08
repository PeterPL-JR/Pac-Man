<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PacMan - Welcome</title>
    <link rel="icon" href="images/player_right.png">
    <link rel="stylesheet" type="text/css" href="styles/welcome.css">
    <link rel="stylesheet" href="styles/styl.css" type="text/css">
</head>
<body>
    <form method="POST">
        <input type="submit" value="Log out" name="logOut" id="logOut">
    </form>
    <a href="levels.php"><button class="btn" id="play">Play</button></a>
    <a href="settings.php"><button class="btn" id="settings">Settings</button></a>
    <a href="info.php"><button class="btn" id="info">Info</button></a>
    <script src="animation.js"></script>
</body>
</html>
<?php
if(!isset($_COOKIE['zalogowany'])) {
    $_COOKIE['zalogowany'] = "false";
}
if($_COOKIE['zalogowany'] != "true") {
    header("Location: login.php");
}

$nick = isset($_COOKIE['nick']) ? $_COOKIE['nick'] : "";
echo "<div id='welcome'>". "<h1><span style='color:blue;'>PAC</span><span style='color:yellow;'>MAN</span></br>". "<span style='font-size:30px; color: white;'>Welcome ".$nick. "!</span>".  "</div>";
if(isset($_POST["logOut"]))
{
    if(isset($_SESSION['level'])) unset($_SESSION['level']);
    setcookie("nick", "");
    setcookie("zalogowany", "false");
    header("location: login.php");
}
?>