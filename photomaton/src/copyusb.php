<?php
	include_once "common.php";
	
	//On est au début du processus
	session_start();
	$_SESSION["copyprogress"] = 0;
	$_SESSION["copystatus"] = "Initialisation";
	$_SESSION["nbBig"] = 0;
	$_SESSION["nbSolo"] = 0;
	$_SESSION["currentBig"] = 0;
	$_SESSION["currentSolo"] = 0;	
	session_write_close();
	
	$usb_drive = null;
	
	//On regarde si une clé USB est inséré, de d jusqu'a z
	for ($i = 'd'; $i < 'z'; $i++) {
		if (file_exists("$i:\\")) {
			$usb_drive = $i;
			break;
		}
	}
	
	if ($usb_drive == null) {
		die("Pas de clé USB trouvée");
	}
	
	//On crée les répertoire sur la clé usb
	mkdir("$usb_drive:\\phototwix", 0, true);
	mkdir("$usb_drive:\\phototwix\\full", 0, true);
	
	//On regarde combien il y a de photos
	$nb_big = 0;
	$rep = opendir($root_photo_big);
	while ($file = readdir($rep)) {
		if (!is_dir($file)) {
			$nb_big++;
		}
	}
	closedir($rep);
	
	session_start();
	$_SESSION["copyprogress"] = 0;
	$_SESSION["copystatus"] = "Copie des photos";
	$_SESSION["nbBig"] = $nb_big;
	$_SESSION["current"] = 0;
	session_write_close();
	
	//On copie les fichier sur la clé USB
	//Les photos
	$pct = 0;
	$rep = opendir($root_photo_big);
	while ($file = readdir($rep)) {
		if (!is_dir($file)) {
			session_start();
			$_SESSION["copyprogress"] = $pct / $nb_big * 100;
			$_SESSION["current"] = $pct;
			session_write_close();
			if (!copy("$root_photo_big\\$file", "$usb_drive:\\phototwix\\full\\$file")) {
				die("Pas réussi a copier le fichier $file");
			}
			$pct++;
		}
	}
	closedir($rep);
?>