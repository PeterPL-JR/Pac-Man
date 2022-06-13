<?php

if(isset($_GET['language'])) {
    setcookie("language", $_GET['language']);
    header("Location: settings.php");
}

?>