/**
 * Gestion de tout le coverflow
 */

$container = $('#container');
	
$canAction = true;
 /** Récupère l'ensemble des photos prise lors de l'initialisation */

function requestAllPhoto() {
	showLoading();
	$.ajax({
		type: "POST",
		url:"getAllPhotos.php",
		data: {},
		success: handleRequestAllPhoto
	});
}

function handleRequestAllPhoto(data) {
	hideLoading();
	$("#container").html(data);
	$('#container').imagesLoaded( function(){
		$('#container').isotope({
		  itemSelector : '.thumb',
		  masonry : {
			columnWidth : 80
		  },
		});
		if ($('.thumb_current').length > 0) {
			$top = $('.thumb_current').offset().top;
			$('#container').attr('thumb_basic_x', $top);
		}
	  });
}

function flowActive() {
	if ($("#coverflow")[0].getAttribute('class') == 'coverflow_show') {
		return true;
	} else {
		return false;
	}
}

// On veut voir toute les photos
function showFlow() {
	hideAll();
	$("#coverflow")[0].setAttribute('class', 'coverflow_show');
}


	
  //Select next thumb with class thumb_current
  function thumb_next() {
	remove_watermark();
	if ($('#container').find('.thumb_current').length > 0) {
		$nb_thumb = $('#container').find('.thumb').length;
		$index = $('.thumb_current').index();
		$index++;
		if ($index < $nb_thumb) { //Goto next
			$item_next = $('#container').children()[$index];
			$('.thumb_current').removeClass('thumb_current');
			$item_next.className += ' thumb_current';
			thumb_adjust_container_position();
			return true; //We have move
		} else {
			return false; //We do not move
		}
	}
  }
  
  function thumb_prev() {
	remove_watermark();
  	if ($('#container').find('.thumb_current').length > 0) {
		$nb_thumb = $('#container').find('.thumb').length;
		$index = $('.thumb_current').index();
		$index--;
		if ($index >= 0) { //Goto prev
			$item_next = $('#container').children()[$index];
			$('.thumb_current').removeClass('thumb_current');
			$item_next.className += ' thumb_current';
			thumb_adjust_container_position();
			return true;
		} else {
			return false;
		}
	}
  }
  
  function thumb_zoom() {
	remove_watermark();
	if ($('.thumb_current').hasClass('selected')) {
		$('#container').find('.selected').removeClass('selected');
	} else {
		$('#container').find('.selected').removeClass('selected');
		$('.thumb_current').toggleClass('selected');
	}
	$('#container').isotope('reLayout', thumb_adjust_container_position);
  }
  
  
  
  function remove_watermark() {
	$('#container').find('.delete_watermark').removeClass('delete_watermark');
	$('#container').find('.print_watermark').removeClass('print_watermark');
  }
  
  
  //Delete current item
  function thumb_delete() {
	var $elem = $('.thumb_current');
  
	if ($elem.hasClass('delete_watermark') && $elem.hasClass('selected')) { //Si il est pret a etre supprimé
		$('#container').find('.selected').removeClass('selected');
		remove_watermark();
		var path =  $('.thumb_current .thumb_b').attr('short_src'); 
		
		$.ajax({
			type: "POST",
			url:"delete.php",
			data: {path:path},
			success: thumb_delete_handle
		});
	} else {
		remove_watermark();
		$('#container').find('.selected').removeClass('selected');
		$elem.addClass('selected');
		$elem.addClass('delete_watermark');
		$('#container').isotope('reLayout', thumb_adjust_container_position);
	}
}
  
  function thumb_delete_handle() {
	g_photo_in_action = true; //For bug if delete too fast
	
	$elem_short =  $('.thumb_current .thumb_b').attr('short_src'); //TODO : supprimer ca
	
	$elem = $('#container').find('.thumb_current');
	
	if (thumb_prev() == false) {
		thumb_next();
	}
	
	$('#container').isotope( 'remove', $elem, action);
  }
  
    //Print current photo
  function thumb_print() {
	var $elem = $('.thumb_current');
  
	if ($elem.hasClass('print_watermark') && $elem.hasClass('selected')) { //Si il est pret a etre supprimé
		$('#container').find('.selected').removeClass('selected');
		remove_watermark();
		var path =  $('.thumb_current .thumb_b').attr('short_src'); 
		
		$.ajax({
			type: "POST",
			url:"print.php",
			data: {path:path},
			success: thumb_print_handle
		});
	} else {
		remove_watermark();
		$('#container').find('.selected').removeClass('selected');
		$elem.addClass('selected');
		$elem.addClass('print_watermark');
		$('#container').isotope('reLayout', thumb_adjust_container_position);
	}
	
  }
  
  function thumb_print_handle() {
	$('#container').find('.selected').removeClass('selected');
	remove_watermark();
	$('#container').isotope('reLayout', thumb_adjust_container_position);
  }
  
  function action() {
	g_photo_in_action = false;
  }
  
  
  //Add a new element to the gallery
  function thumb_add($newEls) {
	//We make $newEls thumb_current
	$('#container').find('.thumb_current').removeClass('thumb_current');
	$newEls.addClass("thumb_current");
	$newEls.addClass('selected');
	//Add new elem 
	thumb_zoom();
    $('#container').append( $newEls ).isotope('appended', $newEls, thumb_adjust_container_position);
  }
  
  //Adjust galery top when scrooling by adjusting margin-top;
  function thumb_adjust_container_position() {
	$top_basic = $('#container').attr('thumb_basic_x');
	$top = $('.thumb_current').offset().top;
	$current_height = $('.thumb_current').height();
	$container_top_marging = $('#container').css("margin-top");
	$container_top_marging = $container_top_marging.substring(0, $container_top_marging.length - 2);
	
	if (((parseInt($top) + parseInt($current_height)) > window.innerHeight) || (parseInt($top) < parseInt($top_basic))) { //On dépasse la zone visible, on remonte tout ca
		$new_top = parseInt($container_top_marging) - parseInt($top) + parseInt($top_basic);
		if ($new_top > 0) {
			$new_top = 0;
		}
		$new_top = $new_top + 'px';
		$('#container').css("margin-top", $new_top);
	}
  }
  
  
