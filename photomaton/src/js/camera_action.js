var current_take_photo = g_nb_take_photo;

/** Prendd g_nb_take_photo tout les photo_interval, et les ajoute a la div photo_result */
function take_photo() {
	g_photo_in_action = true;
	var video_webgl = $("#camera_webgl")[0];
	var photos = $("#photo_result")[0];
	var photos_blank = $("#photo_result_blank")[0];
	
	// Suppression de tout les enfants existants
	while (photos.hasChildNodes()) {
		photos.removeChild(photos.firstChild);
		
	}
	
	while (photos_blank.hasChildNodes()) {
		photos_blank.removeChild(photos_blank.firstChild);
	}
	
	var current_photo = 1;
	
	for (var i = 0; i < g_nb_take_photo; i++) {
		setTimeout(function() {
			var img = document.createElement('img');
			var video_direct = $("#camera_direct")[0];
			
			img.setAttribute("class", "photo_thumb");
			//Effet de flash
			g_photo_sound.play();
			$("#camera_flash").show().delay(250).fadeOut(250);
			
//On affiche un countdown entre 2 photos
/*
			$('#piecounter').pieChartCountDown({
              time : g_photo_interval / 1000,
              color : '#C9C1C4',
              background: '#5E5E5E',
              size : 150,
              border: 8,
              infinite : false,
			});
			*/
			
			$('#piecounter').pietimer({
				seconds: g_photo_interval / 1000,
				color: '#5E5E5E',
				height: 150,
				width: 150
			});
			$('#piecounter').pietimer('start');
			
			var w = 0; 
			var h = 0; 
			var x = 0; 
			var y = 0;
			
			if (g_camRationDirection == 'h') {
				w = Math.floor(video_webgl.height / g_camRation);
				h = video_webgl.height;
				x = Math.floor((video_webgl.width - w) / 2);
				y = 0;
			} else {
				h = Math.floor(video_webgl.width / g_camRation);
				w = video_webgl.width;
				y = Math.floor((video_webgl.height - h) / 2);
				x = 0;
			}
			
			var dataURL = video_webgl.toDataURL('image/png', x, y, w, h);
			img.src = dataURL;
			
			photos.appendChild(img);
			//On sauvegarde les photos sans les effets
			var img_blank = document.createElement('canvas');
			img_blank.width = w;
			img_blank.height  = h;
			img_blank.setAttribute("class", "photo_thumb_blank");
			img_blank.getContext('2d').drawImage(video_direct, x, y, w, h, 0, 0, w, h);
			

			
			
			photos_blank.appendChild(img_blank);
			
			
			
			
			$("#camera_view_result_" + current_photo)[0].src = dataURL;
			$("#camera_view_" + current_photo)[0].style.display='none';
			$("#camera_view_result_" + current_photo)[0].style.display='block';
			current_photo++;			
		}, g_photo_interval * i);
	}
	
	setTimeout(function() {
		requestMergePhoto();
	}, g_photo_interval * (g_nb_take_photo - 1) + 400);
}

/** Une fois toute les photos prise, on fait un appel AJAX à PHP qui va combiner les photos */

function requestMergePhoto() {
	var photoArray = new Array();
	var photoArrayBlank = new Array();
	var thumb = $(".photo_thumb");
	var thumb_blank = $(".photo_thumb_blank");
	
	hideAll(); 
	
	for (var i = 0; i < thumb.length; i++) {
		photoArray[i] = thumb[i].src;
	}
	
	for (var i = 0; i < thumb_blank.length; i++) {
		photoArrayBlank[i] = thumb_blank[i].toDataURL('image/png');
	}
	
	var st = JSON.stringify(photoArray);
	var stb = JSON.stringify(photoArrayBlank);
	
	$.ajax({
		type: "POST",
		url:"mergePhotos.php",
		data: {photo:st,
			   photo_blank:stb},
		success: handleMergePhoto
	});
}

/** Reception de la photo modifiée */
function handleMergePhoto(data) {
	//On met a jour la photo
	var dom = stringToDom(data);
	
	$("#photo_preview_full")[0].src = dom.getAttribute("href");
	
	//Ajouter l'ajout a la galerie
	var data = [{
		image: dom.getAttribute("href"),
		thumb: dom.firstChild.getAttribute("src")
	}];
	
	Galleria.get(0).push(data);
	g_photo_in_action = false; //On a fini de prendre une photo

	$("#preview")[0].style.display='block';
	
} 
