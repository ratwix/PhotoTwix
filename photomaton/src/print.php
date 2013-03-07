<?php

include_once "common.php";

$file = $_POST['path'];
exec("$iview_path $full_path_big\\".pathinfo($file)['basename']."\" /print");

echo $file;

?>