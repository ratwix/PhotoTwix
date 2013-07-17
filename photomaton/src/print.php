<?php

include_once "common.php";

//Log a new print
if (!file_exists("./logs")) {
	mkdir("./logs", 0777, true);
}
$date = date("Y-m-d H-i-s");
file_put_contents("$log_file", "print:$date\n", FILE_APPEND);

$file = $_POST['path'];
exec("$iview_path $full_path_big\\".pathinfo($file)['basename']."\" /print");

echo $file;

?>