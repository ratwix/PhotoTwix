 //Les variables globales
 
 var g_nb_take_photo = 4; 	//nombre de photos a prendre
 var g_photo_interval = 2000; //interval entre les photos
 
 var g_camHeight = 480;
 var g_camWidth = 640;
 var g_camRation = 1.5;
 var g_camRationDirection = 'h'; //h si le ration est applique horizontalement; v si il est appliqué verticalement
 
 var g_countdown_delay = 4;
 
 var g_count_sound;
 var g_photo_sound;
 
 var g_photo_in_action = false;
 
 var g_effect_value = 0;
 var g_delta_eff = 1;
 var g_min_effet = 0;
 var g_max_effet = 100;
 
 var myCoverflow; //le cover flow
 
function init() {
	initCamera();
	
	g_count_sound = new Audio("./sound/bip.ogg");
	g_photo_sound =  new Audio("./sound/photo.ogg");
	requestAllPhoto();
}

//Initialise la webcam
function initCamera() {
	var onFaild = function(e) {
		console.log('Connecter le camera', e);
	};

	function hasGetUserMedia() {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}

	if (hasGetUserMedia()) {
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		window.URL = window.URL || window.webkitURL;
		//On récupère la camera
		navigator.getUserMedia({video: {
										mandatory: {
											maxWidth:1280
										}}}, 
		
		function(localMediaStream) {
			var video = $("#camera_direct")[0];
			video.src = window.URL.createObjectURL(localMediaStream);
			video.className = 'camera';
			//On affiche la camera
			setTimeout("init_effect_filter()", 500);
			setTimeout("null_effect()", 1000);
		}, onFaild);
	}
}

//Cache tout les panel du projet
function hideAll() {
	$("#camera")[0].style.display='none';
	$("#preview")[0].style.display='none';
	$("#validate_delete")[0].style.display='none';
	$("#validate_print")[0].style.display='none';
	$("#coverflow")[0].setAttribute('class', 'coverflow_hide');
}

function stringToDom(s) {
	var div = document.createElement('div');
	div.innerHTML = s;
	return div.firstChild; 
}