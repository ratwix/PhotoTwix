<?php
	ini_set("memory_limit","1000M");
	
	include_once "common.php";
	
	$photo_height = 350;
	$marge = 10;
	$ratio = 2/3;
	$nb_col = 16;
	$photo_list = array();
	
	set_time_limit(3000);
	
	$nb_photos = 0;
	$rep = opendir($root_photo_blank);
	while ($file = readdir($rep)) {
		if (!is_dir($file)) {
			$nb_photos++;
			$photo = array(
						"name" 	=> 	$file,
						"px"	=> -1,
						"py"	=> -1);
			array_push($photo_list, $photo);
		}
	}
	closedir($rep);
	shuffle($photo_list);
	$nb_photo = count($photo_list);
	
	$result_height = $nb_col * $photo_height + (($nb_col + 4) * $marge);
	$result_width = $result_height * $ratio;
	$result = imagecreatetruecolor($result_width, $result_height);
	$bg = imagecolorallocate($result, 0, 0, 0);
	imagefill ($result, 0, 0, $bg);
	
	
	
	$cur_x = $marge;
	$cur_y = $marge;
	$next_y = 30000000;
	
	$size_array = array();
	
	$lmarge = 0;
	$new_line = true;
	for ($i = 0; $i < $nb_photo; $i++) {

		//Calcul de la marge pour la ligne
		if ($new_line) {
			$j = $i;
			
			$tmp = $cur_x;
			$nb_image = 0;
			do {
				$img = ImageCreateFromPng($root_photo_blank."/".$photo_list[$j]["name"]);
				
				$width = floor(imagesx($img) / imagesy($img) * $photo_height);
				imagedestroy($img);
				if ($tmp + $width + $marge > $result_width) {
					break ;
				}
				$tmp += $width;
				$j++;
				$nb_image++;
			} while ($j < $nb_photo);
			//calcul du reste
			$reste = $result_width - $tmp;
			$lmarge = ($reste - $marge) / $nb_image;
			$new_line = false;
		}
		//On amméliore le contraste
		$cmd = "$convert_path $full_path_blank\\".$photo_list[$i]["name"]."\" -normalize -contrast-stretch  0% -colorspace Gray $full_path_blank\\res_".$photo_list[$i]["name"]."\"";
		//echo "<BR>$cmd</BR>";
		system($cmd, $rt);
		$img = ImageCreateFromPng($root_photo_blank."/res_".$photo_list[$i]["name"]);
		
		imagecopymergegray($img, $img, 0, 0, 0, 0, imagesx($img), imagesy( $img ), 0);
		$width = floor(imagesx($img) / imagesy($img) * $photo_height);
		unlink($root_photo_blank."/res_".$photo_list[$i]["name"]);
		if ($cur_x + $width + $marge > $result_width) {
			$cur_y = $cur_y + $photo_height + $marge;
			$cur_x = $marge;
			$new_line = true;
			$i--;
			continue;
		}
		
		imagecopyresized($result, $img, $cur_x, $cur_y, 0, 0, $width, $photo_height, imagesx($img), imagesy($img));
		imagedestroy($img);
		$cur_x += $width + $lmarge;
		
	}
	
	
	imagepng($result, $root_photo."/".'poster.png');
?>