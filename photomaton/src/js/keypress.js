
KEY_PHOTO	= "b".charCodeAt(0);
KEY_EFFECT	= "e".charCodeAt(0);
KEY_CHANGE	= "n".charCodeAt(0);
KEY_NEXT	= "l".charCodeAt(0);
KEY_PREV	= "k".charCodeAt(0);
KEY_PRINT	= "p".charCodeAt(0);
KEY_DEL		= "d".charCodeAt(0);
KEY_TEST	= "t".charCodeAt(0); 
KEY_AD_EFF	= "u".charCodeAt(0);
KEY_MN_EFF	= "i".charCodeAt(0); 
KEY_USB		= "s".charCodeAt(0);
KEY_DELALL	= "j".charCodeAt(0);    
 
 function showCamera() {
	$("#camera")[0].style.display = 'block';	//On affiche la camera
				
	//On cache les previews de camera et on affiche les camera
	$("#camera_view_1")[0].style.display = 'block';	//On affiche la camera
	$("#camera_view_2")[0].style.display = 'block';	//On affiche la camera
	$("#camera_view_3")[0].style.display = 'block';	//On affiche la camera
	$("#camera_view_4")[0].style.display = 'block';	//On affiche la camera
	$("#camera_view_result_1")[0].style.display = 'none';	//On affiche la camera
	$("#camera_view_result_2")[0].style.display = 'none';	//On affiche la camera
	$("#camera_view_result_3")[0].style.display = 'none';	//On affiche la camera
	$("#camera_view_result_4")[0].style.display = 'none';	//On affiche la camera
				
 }
 
 function showCopy() {
	$("#copy_usb")[0].style.display = 'block';
 }
 
 function showDelall() {
	$("#delall")[0].style.display = 'block';
 }
 
 function reset() {
	hideAll(); 									//On cache tout les éléments
	showCamera();
	null_effect();
 }
 
 function detectkey(event) {
	var keyCode = event.keyCode;
	
	if (!g_photo_in_action) { //Ces actions ne sont autorisées que lorsque l'on ne prends pas de photos
		
		//Photo
		if (keyCode == KEY_PHOTO) {
			if ($("#camera")[0].style.display == 'none') {
				hideAll(); 									//On cache tout les éléments
				showCamera();
				null_effect();								//On met les effets a zero
			} else {
				startCountdown();
			}
		}
		
		//Photo precedente
		if (keyCode == KEY_PREV) {
			if (flowActive()) {
				Galleria.get(0).prev();
			} else {
				showFlow();
			}
		}
		
		//Photo suivante
		if (keyCode == KEY_NEXT) {
			if (flowActive()) {
				Galleria.get(0).next();
			} else {
				showFlow();
			}
		}
		
		//Impression
		if (keyCode == KEY_PRINT) {
			if ($("#validate_print")[0].style.display == 'block') {
				printCurrent();
			} else {
				if (flowActive() || ($("#preview")[0].style.display == 'block')) {
					validatePrintCurrent();
				}
			}
		}
		
		//Suppression
		if (keyCode == KEY_DEL) {
			if ($("#validate_delete")[0].style.display == 'block') {
				deleteCurrent();
			} else {
				if (flowActive() || ($("#preview")[0].style.display == 'block')) {
					validateDeleteCurrent();
				}
			}
		}
	
		//Change le nombre de photos a prendre
		if (keyCode == KEY_CHANGE) {
			change_nb_photo();
		}

	} 

	//on ajoute de l'effet
	if (keyCode == KEY_AD_EFF) {
		g_effect_value += g_delta_eff;
		if (g_effect_value > g_max_effet) {
			g_effect_value = g_max_effet;
		}
	}
		
	//On enleve de l'effet
	if (keyCode == KEY_MN_EFF) {
		g_effect_value -= g_delta_eff;
		if (g_effect_value < g_min_effet) {
			g_effect_value = g_min_effet;
		}
	}
	
	//Change l'effet
	if (keyCode == KEY_EFFECT) {
		change_filter();
	}
	
	//Change l'effet
	if (keyCode == KEY_USB) {
		if ($("#copy_usb")[0].style.display == 'none') {
			hideAll();
			showCopy();
			g_copy_progress = false; //TODO a changer de place
		} else {
			if (g_copy_progress == false) {
				hideAll();
				showCopyStart();
			}
		}

	}
	
		//Change l'effet
	if (keyCode == KEY_DELALL) {
		if ($("#delall")[0].style.display == 'none') {
			$("#delall_txt")[0].innerHTML = "Tout supprimer ? Inserez une cle USB pour la sauvegarde et appuyez a nouveau sur le bouton";
			hideAll();
			showDelall();
		} else {
			$("#delall_txt")[0].innerHTML = "Reset en cours";
			$.ajax({
				url: 'copydelete.php',
				success: reset,
				fail: reset
			});
		}
	}
 }