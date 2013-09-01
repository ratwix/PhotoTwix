
KEY_PHOTO	= "b".charCodeAt(0);
KEY_VIOLET	= "v".charCodeAt(0);
KEY_GREEN	= "g".charCodeAt(0);
KEY_LEFT	= "l".charCodeAt(0);
KEY_RIGHT	= "r".charCodeAt(0);
KEY_USB		= "u".charCodeAt(0);
KEY_MENU	= "j".charCodeAt(0);	//Acces quand appuie 5 seconde sur USB
 
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
 
 function reset() {
	hideAll(); 									//On cache tout les éléments
	showCamera();
	null_effect();
 }
 
 function detectkey(event) {
	var keyCode = event.keyCode;
	

		
		//Si on est sur l'écran de photo, alors on change les effets, sinon on navigue dans les photos ou on navigue dans le menu
		if (keyCode == KEY_LEFT) {
			if ($("#camera")[0].style.display == 'block') { //On est dans les photos : change les effets
				change_filter_min();
			} else if (menuActive()) {
				prevMenu();
			} else if (flowActive()) {
				thumb_prev();
			} else { //Normalement on est jamais ici. Dans tout les cas on ne fait rien
				//showFlow();
			}
		}
		
		//Touche de navigation gauche droite
		if (keyCode == KEY_RIGHT) {
			if ($("#camera")[0].style.display == 'block') { //On est dans les photos : change les effets
				change_filter();
			} else if (menuActive()) {
				nextMenu();
			} else if (flowActive()) {
				thumb_next();
			} else { //Normalement on est jamais ici. Dans tout les cas on ne fait rien
				//showFlow();
			}
		}
		
	if (!g_photo_in_action) { //Ces actions ne sont autorisées que lorsque l'on ne prends pas de photos
		
		//Photo
		if (keyCode == KEY_PHOTO) {
			if ($("#camera")[0].style.display == 'none') {	//Si on n'est pas sur l'ecran de photo
				hideAll(); 									//On cache tout les éléments
				showCamera();
				null_effect();								//On met les effets a zero
			} else {
				startCountdown();							//Si on est sur l'ecran de photo
			}
		}
		
		//La touche verte de validation. Sur la photo, on va dans la gallerie
		//Sur la gallerie, valide l'impression ou la suppression
		if (keyCode == KEY_GREEN) {
			if ($("#camera")[0].style.display == 'block') { //On est dans les photos : On va dans la gallerie
				showFlow();
			} else if (menuActive()) { //On est dans le menu, valider l'action
				selectMenu();
			} else if (flowActive()) {
				var	elem = $('.thumb_current');
				if (elem.hasClass('print_watermark') && elem.hasClass('selected')) { //Si l'élement est sélectionné pour impression, on l'imprime
					thumb_print();
				} else if (elem.hasClass('delete_watermark') && elem.hasClass('selected')) { //Si l'élement est selectionné pour suppression, on le supprime
					thumb_delete();
				}
			}
		}
		
		//La touche violette : Si on est sur les photos : on passe de 1 photo à 4.
		//Si on est sur la gallerie, on passe rien --> Zoom --> Print --> Delete --> Rien
		if (keyCode == KEY_VIOLET) {
			if ($("#camera")[0].style.display == 'block') { //On est dans les photos : On change le nombre de photos
				change_nb_photo();
			} else if (menuActive()) { //On est dans le menu, ne rien faire
				
			} else if (flowActive()) { //On est dans le flow
				var elem = $('.thumb_current');
				
				if (elem.hasClass('print_watermark')) {
					thumb_select_delete();
				} else if (elem.hasClass('delete_watermark')) {
					thumb_clear();
				} else if (!elem.hasClass('selected')) { //L'élement n'est pas selectionné : on zoom
					thumb_zoom();
				} else { //Ni en print, ni en delete, on les met en print
					thumb_select_print();
				}
			}
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
		if (keyCode == KEY_MENU) {
			showMenu();
		}
	}
 }