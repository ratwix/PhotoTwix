<?php
	include_once "common.php";
	
	$d = opendir($root_photo_big) or die("Erreur ouverture du repertoire de photos $root_photo");
	
	$first = true;
	
	while($e = @readdir($d)) {
		if(is_dir($root_photo_big.'/'.$e) || ($e == '.') || ($e == '..')) {
 
		} else {
			/*
			echo "<a href='$root_photo_big/$e'><img src='$root_photo_thumb/$e'/></a>\n";
			*/
			$img = imagecreatefrompng($root_photo_big.'/'.$e);
			$w = imagesx($img);
			$h = imagesy($img);
			
			$or = 'thumb_v';
			if ($w > $h) {
				$or = 'thumb_h';
			}
			
			if ($first) {
				echo "<div class='thumb thumb_current'>";
			} else {
				echo "<div class='thumb'>";
			}
			echo "	<img src='$root_photo_big/$e' short_src='$root_photo_big/$e'  class='thumb_b $or'/>
					<img src='$root_photo_thumb/$e' short_src='$root_photo_thumb/$e' class='thumb_s $or'/>
				  </div>\n";
			$first = false;
		}
		
	}
	closedir($d);
?>