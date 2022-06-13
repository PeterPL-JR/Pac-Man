<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PacMan - Create account</title>
    <link rel="icon" href="images/player_right.png">
    <link rel="stylesheet" href="styles/styl.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="styles/php-style.css">
</head>
<body>
    <?php include 'translate.php';?>
    <img src="images/pacman1.png" id="pacman1">
    <img src="images/pacman2.png" id="pacman2">
    <div id="main">
        <h1 id="h1"><?php t("sign-up-page");?></h1>
        <form method="POST">
            <p id="txt"><?php t("login");?></p>
            <input type="text" placeholder="<?php t("login-label");?>" name="login" id="login">
            <p id="txt"><?php t("username");?></p>
            <input type="text" placeholder="<?php t("username-label");?>" name="username" id="username">
            <p id="txt"><?php t("password");?></p>
            <input type="password" placeholder="<?php t("password-label");?>" name="password" id="password">
            <?php t("create-account-exists");?>
            <input type="submit" value="<?php t("sign-up-button");?>" id="btn">
        </form>
    </div>
</body>
</html>
<?php
if(!isset($_COOKIE['zalogowany'])) {
    $_COOKIE['zalogowany'] = "false";
}
if($_COOKIE['zalogowany'] == "true") {
    header("Location: welcome.php");
}

function login_error() {
    echo "<div style='width:150px; height:90px; margin:auto; margin-top:-100px; text-align:center;'><h1 style='color:red; font-size:40px;'>". "Error". "</h1></div>";
}

    if(isset($_POST["login"]) && isset($_POST["password"]) && isset($_POST["username"]))
    {
        if($_POST["login"] != "" && $_POST["password"] != "" && $_POST["username"] != "")
        {
            $login = $_POST["login"];
            $password = $_POST["password"];
            $username = $_POST["username"];
            $hash = password_hash($password, PASSWORD_DEFAULT);
            include 'database.php';

            $login_exists = mysqli_query($base, "SELECT COUNT(*) FROM users WHERE login = '$login'");
            if(mysqli_fetch_row($login_exists)[0] == 0) {
                mysqli_query($base, "INSERT INTO users (nick, login, password) VALUES ('$username', '$login', '$hash');");

                $query2 = mysqli_query($base, "SELECT users.id FROM users WHERE users.login = '$login' AND users.password = '$hash';");
                $user_id = mysqli_fetch_row($query2)[0];
                mysqli_query($base, "INSERT INTO users_scores (user_id, level_id) VALUES($user_id, 1);");

                setcookie("zalogowany", "true");
                setcookie("nick", $username);
                setcookie("login", $login);

                header("location: welcome.php");
            } else {
                login_error();
            }
        }
        else {
            login_error();
        }
    }
?>