<?php
	include_once "common.php";
	
	$d = opendir($root_photo_big) or die("Erreur ouverture du repertoire de photos $root_photo");
	
	while($e = @readdir($d)) {
		if(is_dir($root_photo_big.'/'.$e) || ($e == '.') || ($e == '..')) {
 
		} else {
			echo "<a href='$root_photo_big/$e'><img src='$root_photo_thumb/$e'/></a>\n";
		}
	}
	closedir($d);
?>