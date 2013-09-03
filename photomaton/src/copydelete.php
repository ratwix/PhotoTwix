<?php
	include_once "common.php";
	
	$usb_drive = null;
	
	function rmdir_recursive($dir)
	{
		//Liste le contenu du répertoire dans un tableau
		$dir_content = scandir($dir);
		//Est-ce bien un répertoire?
		if($dir_content !== FALSE){
			//Pour chaque entrée du répertoire
			foreach ($dir_content as $entry)
			{
				//Raccourcis symboliques sous Unix, on passe
				if(!in_array($entry, array('.','..'))){
					//On retrouve le chemin par rapport au début
					$entry = $dir . '/' . $entry;
					//Cette entrée n'est pas un dossier: on l'efface
					if(!is_dir($entry)){
						unlink($entry);
					}
					//Cette entrée est un dossier, on recommence sur ce dossier
					else{
						rmdir_recursive($entry);
					}
				}
			}
		}
		//On a bien effacé toutes les entrées du dossier, on peut à présent l'effacer
		rmdir($dir);
	}
	
	
	//On regarde si une clé USB est inséré, de d jusqu'a z
	for ($i = 'd'; $i < 'j'; $i++) {
		if (file_exists("$i:\\")) {
			$usb_drive = $i;
			break;
		}
	}
	
	//On copie tout si on a une cle usb
	if ($usb_drive != null) {
		//On crée les répertoire sur la clé usb
		mkdir("$usb_drive:\\phototwix", 0, true);
		mkdir("$usb_drive:\\phototwix\\save", 0, true);
		shell_exec("xcopy $full_path\" \"$usb_drive:\\phototwix\save\" /e/a");
	}
	
	//On efface tout
	rmdir_recursive($root_photo);
	mkdir($root_photo);
	mkdir($root_photo_mini);
	mkdir($root_photo_blank);
	mkdir($root_photo_big);
	mkdir($root_photo_thumb);
	mkdir($delete_path);
?>