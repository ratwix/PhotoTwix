var current_take_photo = g_nb_take_photo;

/* Take nb Photos */
function take_photo() {
	g_photo_in_action = true; //Block action
	
	//Empty current photos
	var photos = $("#photo_result")[0];
	var photos_blank = $("#photo_result_blank")[0];

	while (photos.hasChildNodes()) {
		photos.removeChild(photos.firstChild);
		
	}	
	while (photos_blank.hasChildNodes()) {
		photos_blank.removeChild(photos_blank.firstChild);
	}
	
	//Take all photo
	take_photo_and_count(1);
}

/**
 * Take a photo and run piecount if current_photo < nb_photo
 */
function take_photo_and_count(current_photo) {
	//Flash effect
	g_photo_sound.play();
	$("#camera_flash").show().delay(250).fadeOut(250);
	
	//Capture photo
	capture_photo(current_photo);
	
	//If need to take more photo --> capture one more photo after piecount
	//Else --> Ask for photo merge
	if ((current_photo) < g_nb_take_photo) {
		$('#piecounter').pietimer({
			seconds: g_photo_interval / 1000,
			color: '#5E5E5E',
			height: 150,
			width: 150
		}, function () { //recursive call up to current_photo
				take_photo_and_count(current_photo + 1);
		});
		$('#piecounter').pietimer('start');
	} else {
		requestMergePhoto();
	}
}

/**
 * Capture current camera photo & display it
 */
function capture_photo(current_photo) {
	var video_webgl = $("#camera_webgl")[0];
	var video_direct = $("#camera_direct")[0];
	
	var photos = $("#photo_result")[0];
	var photos_blank = $("#photo_result_blank")[0];
	
	var img = document.createElement('img');
	img.setAttribute("class", "photo_thumb");
	
	//Compute capture zone
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
	//Save result		
	var dataURL = video_webgl.toDataURL('image/png', x, y, w, h);
	img.src = dataURL;		
	photos.appendChild(img);
	//Save result without effect
	var img_blank = document.createElement('canvas');
	img_blank.width = w;
	img_blank.height  = h;
	img_blank.setAttribute("class", "photo_thumb_blank");
	img_blank.getContext('2d').drawImage(video_direct, x, y, w, h, 0, 0, w, h);
			
	photos_blank.appendChild(img_blank);
	//Show the photo
	$("#camera_view_result_" + current_photo)[0].src = dataURL;
	$("#camera_view_" + current_photo)[0].style.display='none';
	$("#camera_view_result_" + current_photo)[0].style.display='block';
}

/** All photos are taken -> AJAX php call to merge them */

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

/** Merge callback */
function handleMergePhoto(data) {
	//On met a jour la photo
	showFlow();
	thumb_add($(data));
	g_photo_in_action = false; //On a fini de prendre une photo
} 
