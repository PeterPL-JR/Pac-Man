<?php

include '../database.php';

if($_GET['query'] == "tiles") {
    $query = mysqli_query($base, "SELECT * FROM tiles_variants;");
    $tiles = [];
    
    while($row = mysqli_fetch_assoc($query)) {
        $tiles[$row['id'] - 1] = $row['file_name'];
    }
    echo json_encode($tiles);
}

if($_GET['query'] == "create-level") {
    $query = mysqli_query($base, "SELECT COUNT(*) FROM levels;");
    echo mysqli_fetch_row($query)[0];
}

if($_GET['query'] == "save-level") {
    $str = $_GET['string'];
    $level = $_GET['level'];

    $width = $_GET['width'];
    $height = $_GET['height'];

    mysqli_query($base, "UPDATE levels SET map_data = '$str', width = $width, height = $height WHERE id = $level;");
}

if($_GET['query'] == "load-level") {
    $level = $_GET['level'];
    $query = mysqli_query($base, "SELECT * FROM levels WHERE id = $level;");

    $str = "";
    $width = -1;
    $height = -1;

    while($row = mysqli_fetch_assoc($query)) {
        $str = $row['map_data'];
        
        $width = $row['width'];
        $height = $row['height'];
    }
    
    echo json_encode([
        "string" => $str,
        "width" => (int) $width,
        "height" => (int) $height,
    ]);
}

?>