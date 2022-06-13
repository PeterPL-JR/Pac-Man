<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PacMan - Info</title>
    <link rel="icon" href="images/player_right.png">

    <link rel="stylesheet" href="styles/styl.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="styles/levels.css">
    <link rel="stylesheet" type="text/css" href="styles/welcome.css">
    <link rel="stylesheet" type="text/css" href="styles/game-style.css">
</head>
<body>
<?php
if(!isset($_COOKIE['zalogowany'])) {
    $_COOKIE['zalogowany'] = "false";
}
if($_COOKIE['zalogowany'] != "true") {
    header("Location: login.php");
}
?>

</body>
</html>