<?php
	include_once "common.php";
	
	$photos = json_decode($_POST['photo']);
	$photos_blank = json_decode($_POST['photo_blank']);
	
	$photo_decode_array = array();
	$photo_decode_array_blank = array();
	
	$thumb_width = 20;

	
	foreach ($photos as $p) {
		$p = substr($p, 22, strlen($p) - 1);
		$photo_decode_array[] = imagecreatefromstring(base64_decode($p));
	}
	
	foreach ($photos_blank as $p) {
		$p = substr($p, 22, strlen($p) - 1);
		$photo_decode_array_blank[] = imagecreatefromstring(base64_decode($p));
	}
	
	
	
	if (count($photo_decode_array) > 0) { //On a bien plusieurs photos
		if (count($photo_decode_array) == 1) { //1 photos
			$w = imagesx($photo_decode_array[0]);
			$h = imagesy($photo_decode_array[0]);
			$result = imagecreatetruecolor($w + 20, $h + 20); //+20 = 10 de marge
			
			$bg = imagecolorallocate($result, 255, 255, 255); //la couleur de fond
			imagefill ($result, 0, 0, $bg);
			//On copie toute les images sources vers l'image destination
			imagecopy($result, $photo_decode_array[0], 10, 10, 0, 0, $w, $h);
		}
		
		if (count($photo_decode_array) == 2) { //2 photos
			$w = imagesx($photo_decode_array[0]);
			$h = imagesy($photo_decode_array[0]);
			$result = imagecreatetruecolor($w + 20, $h * 2 + 30); //+30 = 10 de marge
			
			$bg = imagecolorallocate($result, 255, 255, 255); //la couleur de fond
			imagefill ($result, 0, 0, $bg);
			//On copie toute les images sources vers l'image destination
			imagecopy($result, $photo_decode_array[0], 10, 10, 0, 0, $w, $h);
			imagecopy($result, $photo_decode_array[1], 10, 20 + $h, 0, 0, $w, $h);
		}
		
		if (count($photo_decode_array) == 4) { //4 photos
			$w = imagesx($photo_decode_array[0]);
			$h = imagesy($photo_decode_array[0]);
			$result = imagecreatetruecolor($w * 2 + 30, $h * 2 + 30); //+30 = 10 de marge
			
			$bg = imagecolorallocate($result, 255, 255, 255); //la couleur de fond
			imagefill ($result, 0, 0, $bg);
			//On copie toute les images sources vers l'image destination
			imagecopy($result, $photo_decode_array[0], 10, 10, 0, 0, $w, $h);
			imagecopy($result, $photo_decode_array[1], 20 + $w, 10, 0, 0, $w, $h);
			imagecopy($result, $photo_decode_array[2], 10, 20 + $h, 0, 0, $w, $h);
			imagecopy($result, $photo_decode_array[3], 20 + $w, 20 + $h, 0, 0, $w, $h);
		}
	}
	
	$d = date("Y-m-d_H-i-s");
	
	//on écrit toute les photos
	//les minis
	/*
	for ($i = 0; $i < count($photo_decode_array); $i++) {
		imagepng($photo_decode_array[$i], $root_photo_mini."/".$d.'_'.$i.'.png');
	}
	*/
	for ($i = 0; $i < count($photo_decode_array_blank); $i++) {
		imagepng($photo_decode_array_blank[$i], $root_photo_blank."/".$d.'_'.$i.'.png');
	}
	
	
	imagepng($result, $root_photo_big."/".$d.'.png');
	
	//On créé un thumbnail
	
	$sourceWidth = imagesx($result);
	$sourceHeight = imagesy($result);
	
	$sourceWidthThumb = $sourceWidth * $thumb_width / 100;
	$sourceHeightThumb = $sourceHeight * $thumb_width / 100;
	
	$thumb = imagecreatetruecolor($sourceWidthThumb,$sourceHeightThumb);
	
	imagecopyresized($thumb,$result,0,0,0,0,$sourceWidthThumb, $sourceHeightThumb,$sourceWidth,$sourceHeight);
	
	imagepng($thumb, $root_photo_thumb."/".$d.'.png');
	
	echo "<a href='$root_photo_big/$d.png'><img src='$root_photo_thumb/$d.png'/></a>\n";
?>