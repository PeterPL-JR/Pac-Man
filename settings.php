<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PacMan - Settings</title>
    <link rel="icon" href="images/player_right.png">
    <script src="library.js"></script>

    <link rel="stylesheet" href="styles/styl.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="styles/levels.css">
    <link rel="stylesheet" type="text/css" href="styles/welcome.css">
    <link rel="stylesheet" type="text/css" href="styles/game-style.css">
    <link rel="stylesheet" type="text/css" href="styles/settings.css">
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
?>

<div id="header">
    <h1><?php t("settings-page");?></h1>
</div>
<div id="mainDiv">
    <div id="language-title"><?php t("language");?></div>
    <div id="lang-div">
        <select id="lang-select" onchange="setLang();">
            <?php
            include 'database.php';
            $langs = mysqli_query($base, "SELECT * FROM languages;");
            while($row = mysqli_fetch_assoc($langs)) {
                echo "<option>".$row['name']."</option>";
            }
            ?>
        </select>
    </div>
</div>
<a href="welcome.php"><button id="save"><?php t("save-button");?></button></a>
<a href="welcome.php"><img src="images/pacman2.png" id="button"></a>

<script src="animation.js"></script>
<script>
    var select = getId("lang-select");
    var lang = localStorage.getItem("language");
    if(lang) {
        select.selectedIndex = lang - 1;
    }

    function setLang() {
        var index = select.selectedIndex + 1;

        localStorage.setItem("language", index);
        serverGet("lang_set.php", {language: index}, function(text) {

        });
    }
</script>
</body>
</html>