<?php

include 'database.php';

if($_GET['query'] == "tiles") {
    $query = mysqli_query($base, "SELECT * FROM tiles_variants;");
    $tiles = [];
    
    while($row = mysqli_fetch_assoc($query)) {
        $tiles[$row['id'] - 1] = 
            $row['file_name'];
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

?>