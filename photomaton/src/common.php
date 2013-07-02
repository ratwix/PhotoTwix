<?php
	// Need to Install EasyPhP, IrfanView (used to print), ImageMagick (use for poster maker)
	
	//$root_easyphp = "C:\\Program Files (x86)\\EasyPHP-12.1\\www\\PhotoTwix\\photomaton\\src";
	//$root_easyphp = "C:\\Program Files (x86)\\EasyPHP-DevServer-13.1VC9\\data\\localweb\\PhotoTwix\\photomaton\\src";
	$root_easyphp = __DIR__;
	$root_photo = "./result";
	$root_photo_mini = "./result/single";
	$root_photo_blank = "./result/blank";
	$root_photo_big = "./result/big";
	$root_photo_thumb = "./result/thumb";
	$delete_path = "./result/deleted";
	$convert_path = "\"C:\\Program Files\\ImageMagick-6.8.6-Q16\\convert.exe\"";
	$iview_path = "\"C:\\Program Files (x86)\\IrfanView\\i_view32.exe\"";
	$full_path_big = "\"$root_easyphp\\result\\big";
	$full_path_blank = "\"$root_easyphp\\result\\blank";
	$full_path = "\"$root_easyphp\\result";
	$real_delete = false;
?>