function printCurrent(path) {
	alert(path);
}

/**
 * La suppression
 */

function validateDeleteCurrent() {
	var path = "";
	var index = -1;
	
	//On récupère les indexes
	if (flowActive()) {
		path = Galleria.get(0).getActiveImage().getAttribute("src");
		index = Galleria.get(0).getIndex();
	} else if ($("#preview")[0].style.display == 'block') {
		path = $("#photo_preview_full")[0].src;
		index = Galleria.get(0).getDataLength() - 1;
	}
	
	//on cache tout
	hideAll();
	$("#photo_preview_delete")[0].src = path;
	$("#photo_preview_delete")[0].short_path = path;
	$("#photo_preview_delete")[0].index = index;
	$("#validate_delete")[0].style.display='block';	
}


/**
 * Supprime la photo au chemin path
 */
function deleteCurrent() {
	var path = $("#photo_preview_delete")[0].short_path;
	var index = $("#photo_preview_delete")[0].index;
	
	Galleria.get(0).splice(index, 1); //On supprimer 1 element a l'index donné
	
	$.ajax({
		type: "POST",
		url:"delete.php",
		data: {path:path},
		success: handleDeletePhoto
	});
}

function handleDeletePhoto(data) {
	hideAll();
	showCamera();
	null_effect();								//On met les effets a zero
}

/**
 * L'impression
 */
 
function validatePrintCurrent() {
	var path = "";
	var index = -1;
	
	//On récupère les indexes
	if (flowActive()) {
		path = Galleria.get(0).getActiveImage().getAttribute("src");
		index = Galleria.get(0).getIndex();
	} else if ($("#preview")[0].style.display == 'block') {
		path = $("#photo_preview_full")[0].src;
		index = Galleria.get(0).getDataLength() - 1;
	}
	
	//on cache tout
	hideAll();
	$("#photo_preview_print")[0].src = path;
	$("#photo_preview_print")[0].short_path = path;
	$("#photo_preview_print")[0].index = index;
	$("#validate_print")[0].style.display='block';	
}


/**
 * Supprime la photo au chemin path
 */
function printCurrent() {
	var path = $("#photo_preview_print")[0].short_path;
	var index = $("#photo_preview_print")[0].index;
	
	$.ajax({
		type: "POST",
		url:"print.php",
		data: {path:path},
		success: handlePrintPhoto
	});
}

function handlePrintPhoto(data) {
	hideAll();
	showCamera();
	null_effect();								//On met les effets a zero
}