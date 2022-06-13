<?php

$page_contents = [];
$base = mysqli_connect("localhost", "root", "", "pacman_data");

$language = 1;
if(isset($_COOKIE['language'])) {
    $language = $_COOKIE['language'];
}

$query = mysqli_query($base, "SELECT page_ids.content as id_name, page_contents.content as content from page_contents join page_ids on page_ids.id = page_contents.page_id WHERE lang_id = '$language';");
while($row = mysqli_fetch_assoc($query)) {

    $id_name = $row['id_name'];
    $page_contents[$id_name] = $row['content'];
}

function t($id) {
    global $page_contents;

    if(isset($page_contents[$id])) {
        echo $page_contents[$id];
    }
}

?>