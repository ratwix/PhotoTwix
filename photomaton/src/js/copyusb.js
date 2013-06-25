var g_copy_progress = false;
var copy_interval_id;

function showCopy() {
	$("#copy_txt")[0].innerHTML = "Inserez votre clé et appuyez à nouveau sur le bouton";
	$("#copy_usb")[0].style.display = 'block';
	
	$("#copy_progress_value")[0].style.width = "0%";
	$("#copy_progress_value_txt")[0].innerHTML = "Copie non commancée";
}

function showCopyStart() {
	$("#copy_txt")[0].innerHTML = "Copie en cour";
	$("#copy_usb")[0].style.display = 'block';
	
	$("#copy_progress_value")[0].style.width = "0%";
	$("#copy_progress_value_txt")[0].innerHTML = "";
	
	g_copy_progress = true;
	
	startCopy();
	
	copy_interval_id = 
		setInterval(function() {
			if (g_copy_progress) {
				getCopyProgress();
			} else {
				clearInterval(copy_interval_id);
			}
		}, 500);
}

function startCopy() {
	 $.ajax({
            url: 'copyusb.php',
            success: copyDone,
			fail: copyFail
			});
}

function copyDone(data) {
	g_copy_progress = false;
	hideAll(); 
	showCamera();
	null_effect();
}

function copyFail(data) {
	g_copy_progress = false;
	$("#copy_txt")[0].innerHTML = "La copie a échoué";
}

function getCopyProgress() {
	$.ajax({
            url: 'copyusbprogress.php',
            success: function(data) {
				var arr = JSON.parse(data);
				
				$("#copy_progress_value")[0].style.width = arr.copyprogress + '%';
				$("#copy_progress_value_txt")[0].innerHTML = arr.current + ' / ' + arr.nbBig;
				$("#copy_txt")[0].innerHTML = arr.copystatus;
			}
	});
}