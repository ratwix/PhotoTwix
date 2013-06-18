/**
 * Gestion de tout le coverflow
 */


 /** Récupère l'ensemble des photos prise lors de l'initialisation */

function requestAllPhoto() {
	$.ajax({
		type: "POST",
		url:"getAllPhotos.php",
		data: {},
		success: handleRequestAllPhoto
	});
}

function handleRequestAllPhoto(data) {
	$("#photo_galerie").html(data);
	initCoverFlow();
}
 
 //Initialise tout le coverflow
 
 function initCoverFlow() {
	Galleria.loadTheme('./lib/themes/classic/galleria.classic.js');
	Galleria.configure({
		carouselSpeed: 100,
		transition: 'slide'
	});
    Galleria.run('#photo_galerie');
}

function flowActive() {
	//if ($("#coverflow")[0].style.display == 'block') {
	if ($("#coverflow")[0].getAttribute('class') == 'coverflow_show') {
		return true;
	} else {
		return false;
	}
}

// On veut voir toute les photos
function showFlow() {
	hideAll();
	//$("#coverflow")[0].style.display='block';
	$("#coverflow")[0].setAttribute('class', 'coverflow_show');
	Galleria.get(0).show(Galleria.get(0).getDataLength() - 1);
}