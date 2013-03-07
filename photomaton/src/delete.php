<?php

include_once "common.php";

$file = $_POST['path'];

if ($real_delete) {
	unlink($file);
} else {
	rename($file, $delete_path."/".pathinfo($file)['basename']);
}

echo $file;

?>