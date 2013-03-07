/*
 * Envoi une requete a l'arduino a travers PHP, 
 * qui communique par TCP a RealTerm qui communique par COM avec l'Arduino
 * 
 * Action : 
 *  led1_on : allume la led 1
 *  led2_on : allume la led 2
 *  led3_on : allume la led 3
 *  led_off : etteint les leds 1 2 3
 *	ledFx_on : allume la lampe d'effet
 *	ledFx_off : etteint la lampe d'effet
 *	read_effect : lit la valeur du potar. Si "", alors ca a pas change
*/
function arduinoWrite($action) {
			$.ajax({ url: 'arduino.php?action=' + $action,
					 data: {},
					 type: 'post',
			});
}

function updateEffectValue() {
	$.ajax({ url: 'arduino.php?action=read_effect',
				 data: {},
				 type: 'post',
				 complete: function(){
					updateEffectValue();
				 }
		}).done(function(data) {
			if ((data != null) && (data != 0) &&(data != "") && (data != " ")) {
				g_effect_value = parseInt(data);
			}
		})
}