
var current_delay = g_countdown_delay;
var photo_countdown = null;
var countdown_timer = null;

//Decompte jusqu'a prendre une photo
function startCountdown() {
	g_photo_in_action = true; //On prends une photo
	
	if (current_delay != g_countdown_delay)
		return ; //Qu'on ne reprenne pas une photo pendant qu'on en prends deja une
	
	var countdown = $("#photo_countdown")[0];
	
	countdown.innerHTML = "3";
	countdown.style.display = 'block';
	
	//photo_countdown.setValue(g_countdown_delay, 500);
	
	countdown_timer = setInterval(
		function(){
			current_delay--;
			countdown.innerHTML = current_delay;
			g_count_sound.play();
			$("#photo_countdown").show().delay(200).fadeOut(550);
			//photo_countdown.setValue(current_delay, 600);
			
			if (current_delay == 3) { //On allume 1 lumiere
				arduinoWrite("led1_on");
			}
			
			if (current_delay == 2) {
				arduinoWrite("led2_on");
			}
			
			if (current_delay == 1) {
				arduinoWrite("led3_on");
			}
			
			if (current_delay == 0) {
				clearInterval(countdown_timer);
				current_delay = g_countdown_delay;
				countdown.style.display = 'none';
				//On prends la photo
				arduinoWrite("led_off");
				take_photo();
			}
		}
	, 1000);
}