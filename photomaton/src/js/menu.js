function showMenu() {
	hideAll();
	$("#menu")[0].style.display = 'block';
	$(".menu_item").removeClass('menu_item_selected');
	$("#menu .menu_item:first-child").addClass('menu_item_selected');
}

function menuActive() {
	if ($("#menu")[0].style.display == 'block') {
		return true;
	} else {
		return false;
	}
}

function delAllActive() {
	if ($("#delall")[0].style.display == 'block') {
		return true;
	} else {
		return false;
	}
}

function nextMenu() {
	var current = $(".menu_item_selected");
	if ($(".menu_item_selected").next().length != 0) {
		$(".menu_item_selected").next().addClass('menu_item_selected');
		current.removeClass('menu_item_selected');
	}
}

function prevMenu() {
	var current = $(".menu_item_selected");
	if ($(".menu_item_selected").prev().length != 0) {
		$(".menu_item_selected").prev().addClass('menu_item_selected');
		current.removeClass('menu_item_selected');
	}
}

//Action dans les actions du menu
function selectMenu() {
	if (menuActive()) { //Si on est dans le menu, on lance la fonction appropriée
		var fn = window[$(".menu_item_selected").attr("action")];
		if(typeof fn === 'function') {
			fn();
		}
	} else if (delAllActive()) { //Si on est dans la validation du delete
		delAll();
	}
}

 function showDelall() {
	$("#delall")[0].style.display = 'block';
 }

function delAll() {
	if ($("#delall")[0].style.display == 'none') {
		$("#delall_txt")[0].innerHTML = "Tout supprimer ? Inserez une cle USB pour la sauvegarde et appuyez sur supprimer";
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

function usage() {
	$.ajax({
		type: "POST",
		url: 'log.php',
		success: showusage,
		fail: reset
	});
}

function showusage(data) {
	hideAll();
	$("#usage_content").html(data);
	$("#usage")[0].style.display = 'block';
}
