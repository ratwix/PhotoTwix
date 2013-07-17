<?php
	include_once "common.php";
	
	if (file_exists("./custom/custom.php")) {
		include_once "./custom/custom.php";
	}
	
	//Log a new file creation
	if (!file_exists("./logs")) {
		mkdir("./logs", 0777, true);
	}
	$date = date("Y-m-d H-i-s");
	file_put_contents("$log_file", "merge:$date\n", FILE_APPEND);
	
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
	
	}
	if (isset($g_customize) && ($g_customize == true)) { //On customize les photos
		//print "On customize\n";
		
		if (count($photo_decode_array) == 1) { //4 photos
			//print "On a 1 photos\n";
			$w = imagesx($photo_decode_array[0]);
			$h = imagesy($photo_decode_array[0]);
			$result = imagecreatetruecolor($w + $g_add_width_h, $h + $g_add_height_h);
			
			$bg = imagecolorallocate($result, 255, 255, 255); //la couleur de fond en blanc par defaut
			imagefill ($result, 0, 0, $bg);
			//Si l'image de fond existe, on la crée
			if (file_exists($g_back_h)) {
				$bk = imagecreatefrompng($g_back_h);
				$bkw = imagesx($bk);
				$bkh = imagesy($bk);
				imagecopy($result, $bk, 0, 0, 0, 0, $bkw, $bkh);
			}
			
			//On copie toute les images sources vers l'image destination
			imagecopy($result, $photo_decode_array[0], $g_add_x_h, $g_add_y_h, 0, 0, $w, $h);
			
			if (file_exists($g_front_h)) {
				$fk = imagecreatefrompng($g_front_h);
				imageAlphaBlending($result, true);
				$fkw = imagesx($bk);
				$fkh = imagesy($bk);
				imagecopy($result, $fk, 0, 0, 0, 0, $bkw, $bkh);
				imageSaveAlpha($result, true);
			}
		}
		
		if (count($photo_decode_array) == 4) { //4 photos
			//print "On a 4 photos\n";
			$w = imagesx($photo_decode_array[0]);
			$h = imagesy($photo_decode_array[0]);
			$result = imagecreatetruecolor($w * 2 + 10 + $g_add_width_v, $h * 2 + 15 + $g_add_height_v); //+30 = 10 de marge en largeur + 45 = 15 de marge en hauteur
			
			$bg = imagecolorallocate($result, 255, 255, 255); //la couleur de fond en blanc par defaut
			imagefill ($result, 0, 0, $bg);
			//Si l'image de fond existe, on la crée
			if (file_exists($g_back_v)) {
				$bk = imagecreatefrompng($g_back_v);
				$bkw = imagesx($bk);
				$bkh = imagesy($bk);
				imagecopy($result, $bk, 0, 0, 0, 0, $bkw, $bkh);
			}
			
			//On copie toute les images sources vers l'image destination
			imagecopy($result, $photo_decode_array[0], $g_add_x_v, $g_add_y_v, 0, 0, $w, $h);
			imagecopy($result, $photo_decode_array[1], 10 + $w + $g_add_x_v, $g_add_y_v, 0, 0, $w, $h);
			imagecopy($result, $photo_decode_array[2], $g_add_x_v, 15 + $h + $g_add_y_v, 0, 0, $w, $h);
			imagecopy($result, $photo_decode_array[3], 10 + $w + $g_add_x_v, 15 + $h + $g_add_y_v, 0, 0, $w, $h);
			
			if (file_exists($g_front_v)) {
				$fk = imagecreatefrompng($g_front_v);
				imageAlphaBlending($result, true);
				$fkw = imagesx($bk);
				$fkh = imagesy($bk);
				imagecopy($result, $fk, 0, 0, 0, 0, $bkw, $bkh);
				imageSaveAlpha($result, true);
			}
		}
		
	} else { //On ne customize pas les photos
			if (count($photo_decode_array) == 1) { //1 photos
				$w = imagesx($photo_decode_array[0]);
				$h = imagesy($photo_decode_array[0]);
				$result = imagecreatetruecolor($w + 20, $h + 30); //+20 = 10 de marge
				
				$bg = imagecolorallocate($result, 255, 255, 255); //la couleur de fond
				imagefill ($result, 0, 0, $bg);
				//On copie toute les images sources vers l'image destination
				imagecopy($result, $photo_decode_array[0], 10, 15, 0, 0, $w, $h);
			}
			
			if (count($photo_decode_array) == 4) { //4 photos
				$w = imagesx($photo_decode_array[0]);
				$h = imagesy($photo_decode_array[0]);
				$result = imagecreatetruecolor($w * 2 + 30, $h * 2 + 45); //+30 = 10 de marge en largeur + 45 = 15 de marge en hauteur
				
				$bg = imagecolorallocate($result, 255, 255, 255); //la couleur de fond
				imagefill ($result, 0, 0, $bg);
				//On copie toute les images sources vers l'image destination
				imagecopy($result, $photo_decode_array[0], 10, 15, 0, 0, $w, $h);
				imagecopy($result, $photo_decode_array[1], 20 + $w, 15, 0, 0, $w, $h);
				imagecopy($result, $photo_decode_array[2], 10, 30 + $h, 0, 0, $w, $h);
				imagecopy($result, $photo_decode_array[3], 20 + $w, 30 + $h, 0, 0, $w, $h);
			}	
	}
		

	
	$d = date("Y-m-d_H-i-s");
	
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
	
	$or = 'thumb_v';
	if ($sourceWidth > $sourceHeight) {
		$or = 'thumb_h';
	}
	
	echo "<div class='thumb'>
				<img src='$root_photo_big/$d.png' short_src='$root_photo_big/$d.png'  class='thumb_b $or'>
				<img src='$root_photo_thumb/$d.png' short_src='$root_photo_thumb/$d.png' class='thumb_s $or'/></a>
	  	  </div>\n";
	
	//echo "<a href='$root_photo_big/$d.png'><img src='$root_photo_thumb/$d.png'/></a>\n";
?>