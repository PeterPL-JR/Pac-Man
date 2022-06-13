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

<?php

if(!isset($_COOKIE['zalogowany'])) {
    $_COOKIE['zalogowany'] = "false";
}
if($_COOKIE['zalogowany'] != "true") {
    header("Location: login.php");
}

if(isset($_POST["logOut"]))
{
    if(isset($_SESSION['level'])) unset($_SESSION['level']);
    setcookie("nick", "");
    setcookie("zalogowany", "false");
    header("location: login.php");
}
?>

<div id='welcome'> 
    <h1><span style='color:blue;'>PAC</span><span style='color:yellow;'>MAN</span></h1></br>
    <div style="color: white; margin-top: -50px; font: bold 30px 'Verdana';">
    <?php
    
    include 'translate.php';
    t("welcome");

    $nick = isset($_COOKIE['nick']) ? $_COOKIE['nick'] : "";
    echo " ".$nick."!";
    
    ?>
    </div>
</div>
    <a href="levels.php"><button class="btn" id="play"><?php t("play-button");?></button></a>
    <a href="settings.php"><button class="btn" id="settings"><?php t("settings-button");?></button></a>
    <a href="info.php"><button class="btn" id="info"><?php t("info-button");?></button></a>
    <form method="POST">
        <input type="submit" value="<?php t("log-out-button");?>" name="logOut" id="logOut">
    </form>
</div>

<script src="animation.js"></script>
</body>
</html>