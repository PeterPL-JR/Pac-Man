<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PacMan - Levels</title>
    <script src="library.js"></script>
    <link rel="icon" href="images/player_right.png">
    
    <link rel="stylesheet" href="styles/styl.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="styles/levels.css">
    <link rel="stylesheet" type="text/css" href="styles/welcome.css">
    <link rel="stylesheet" type="text/css" href="styles/game-style.css">
</head>
<body>
<?php
include 'translate.php';

if(!isset($_COOKIE['zalogowany'])) {
    $_COOKIE['zalogowany'] = "false";
}
if($_COOKIE['zalogowany'] != "true") {
    header("Location: login.php");
}
if(isset($_SESSION['level'])) unset($_SESSION['level']);
?>
    <div id="header">
        <h1><?php t("levels-page");?></h1>
    </div>
    <div id="mainDiv"></div>
    <a href="welcome.php"><img src="images/pacman2.png" id="button"></a>

    <script src="animation.js"></script>
    <script src="levels.js"></script>
</body>
</html>