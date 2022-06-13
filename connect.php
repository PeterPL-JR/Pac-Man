<?php

include 'database.php';
session_start();

if($_GET['query'] == "tiles") {
    $query = mysqli_query($base, "SELECT * FROM tiles_variants;");
    $tiles = [];
    
    while($row = mysqli_fetch_assoc($query)) {
        $tiles[$row['id'] - 1] = $row['file_name'];
    }
    echo json_encode($tiles);
}

if($_GET['query'] == "map") {
    $index = $_GET['index'];
    $query = mysqli_query($base, "SELECT * FROM levels WHERE id = $index;");
    
    $data = [];
    while($row = mysqli_fetch_assoc($query)) {
        $data['map'] = json_decode($row['map_data']);
        
        $data['width'] = (int) $row['width'];
        $data['height'] = (int) $row['height'];
    }
    echo json_encode($data);
}

if($_GET['query'] == "set-level") {
    $_SESSION['level'] = $_GET['level'];
}

if($_GET['query'] == "get-level") {
    if(isset($_SESSION['level'])) {
        echo $_SESSION['level'];
    }
}

if($_GET['query'] == "save-score") {
    $points = $_GET['points'];
    $login = $_COOKIE['login'];
    $level = $_GET['level'];
    
    include 'database.php';
    if($_COOKIE['zalogowany'] && isset($_SESSION['level'])) {
        unset($_SESSION['level']);
        $user_id = mysqli_query($base, "SELECT id FROM users WHERE login = '$login';");
        $id = mysqli_fetch_row($user_id)[0];

        $score_id_query = mysqli_query($base, "SELECT id FROM users_scores WHERE user_id = $id AND level_id = $level");
        $score_id = "easter_egg";
        while($row = mysqli_fetch_assoc($score_id_query)) {
            $score_id = $row['id'];
        }
        if($score_id == "easter_egg") mysqli_query($base, "INSERT INTO users_scores(user_id, level_id, points) VALUES($id, $level, $points);");
        else mysqli_query($base, "UPDATE users_scores SET points = $points WHERE id = $score_id");
    }
}

if($_GET['query'] == "unlocked-levels") {
    $user_login = $_COOKIE['login'];
    
    include 'database.php';
    $max_level = mysqli_query($base, "SELECT max(level_id) as max_level from users_scores inner join users on users.id = users_scores.user_id where users.login = '$user_login';");
    echo mysqli_fetch_row($max_level)[0];
}

if($_GET['query'] == "unlock") {
    // New Level
    $level = $_GET['level'];

    $login = $_COOKIE['login'];
    $user_id = mysqli_fetch_row(mysqli_query($base, "SELECT id FROM users WHERE login = '$login';"))[0];
    $score_exists = mysqli_query($base, "SELECT count(*) as counter from users_scores where user_id = $user_id AND level_id = $level;");

    if(mysqli_fetch_row($score_exists)[0] == 0) {
        mysqli_query($base, "INSERT INTO users_scores (user_id, level_id) VALUES($user_id, $level);");
    }
}

?>