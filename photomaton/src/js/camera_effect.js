 /**
  * Fichier qui définit les différents effets
  */
	var effect_filter = [];
	
	var refresh_rate = 40;
	
	var current_texture = null;
	var current_texture2 = null;
	var current_texture3 = null;
	var current_texture4 = null;
  
	/**
	*	Met dans le tableau tout les filtres
	*	Des qu'un filtre est créé, il faut l'ajouter ici
	*/
	function init_effect_filter() {
		//Les effets glfx
		effect_filter.push(null_effect);
		effect_filter.push(grayscale_effect);
		effect_filter.push(sepia_effect);
		effect_filter.push(gotham_effect);
		effect_filter.push(swirl_effect);
		effect_filter.push(pinch_effect);
		effect_filter.push(fisheyes_effect);
		effect_filter.push(vintage_effect);			
		
		effect_filter.push(nashville_effect);
		effect_filter.push(california_gold_effect);
		//effect_filter.push(fisheyes_effect);
		
		//effect_filter.push(bulb_pinch_effect);		
		//effect_filter.push(square_effect);
		
		//effect_filter.push(saturation_effect);
		//effect_filter.push(color_effect);
		//effect_filter.push(country_effect);
		//effect_filter.push(desert_effect);
		//effect_filter.push(brannan_effect);
		effect_filter.push(hefe_effect);
		//effect_filter.push(crossprocess_effect);
		//effect_filter.push(mille_effect);
		//effect_filter.push(portraesque_effect);	
		//effect_filter.push(proviaesque_effect);	
		//effect_filter.push(alien_burn_effect);
		//effect_filter.push(dreamWorld_effect);	
		//effect_filter.push(valviaesque_effect);
		//effect_filter.push(lumo_effect);
		//effect_filter.push(hollywood_effect);	
		//effect_filter.push(xpro_effect);
		
		//Initialise la camera une première fois
		//On ajoute le canvas dans lequel la camera va s'afficher
		var canvas = document.getElementById('camera_webgl');
		var canvas2 = document.getElementById('camera_webgl2');
		var canvas3 = document.getElementById('camera_webgl3');
		var canvas4 = document.getElementById('camera_webgl4');
		var video = $("#camera_direct")[0];
		
		var camera_view = $("#camera_view")[0];
		
		var camera_view_1 = $("#camera_view_1")[0];
		var camera_view_2 = $("#camera_view_2")[0];
		var camera_view_3 = $("#camera_view_3")[0];
		var camera_view_4 = $("#camera_view_4")[0];
		
		canvas4 = fx.canvas();
		canvas4.setAttribute("id", "camera_webgl4");
		canvas4.setAttribute("class", "camera video_4");
		canvas4.setAttribute("onclick", "change_filter()");
		canvas4.style.display='block';
		camera_view_4.appendChild(canvas4);
		
		
		canvas3 = fx.canvas();
		canvas3.setAttribute("id", "camera_webgl3");
		canvas3.setAttribute("class", "camera video_4");
		canvas3.setAttribute("onclick", "change_filter()");
		canvas3.style.display='block';
		camera_view_3.appendChild(canvas3);
		
		canvas2 = fx.canvas();
		canvas2.setAttribute("id", "camera_webgl2");
		canvas2.setAttribute("class", "camera video_4");
		canvas2.setAttribute("onclick", "change_filter()");
		canvas2.style.display='block';
		camera_view_2.appendChild(canvas2);
		
		canvas = fx.canvas();
		canvas.setAttribute("id", "camera_webgl");
		canvas.setAttribute("class", "camera video_4");
		canvas.setAttribute("onclick", "change_filter()");
		canvas.style.display='block';
		camera_view_1.appendChild(canvas);
		

		
		
		current_texture = canvas.texture(video);
		current_texture2 = canvas2.texture(canvas);
		current_texture3 = canvas3.texture(canvas);
		current_texture4 = canvas4.texture(canvas);
	}
  	
	var effect_id = 1;
	var interval_id = 0;

	/* Change le nombre de photos a prendre */
	function change_nb_photo() {
		if (g_nb_take_photo == 4) { //On passe de 4 à 1 photos
			g_nb_take_photo = 1;
			g_camRation = 1.5; //1,5 fois plus long que haut
			g_camRationDirection = 'v';
			
			//On cache les cameras 3 et 4 : que 1 colonne
			$("#camera_tab_1_1")[0].setAttribute("class", ""); 
			$("#camera_tab_1_2")[0].setAttribute("class", "hide");
			$("#camera_tab_2_1")[0].setAttribute("class", "hide");
			$("#camera_tab_2_2")[0].setAttribute("class", "hide");
			//On change le dispositif des camera
			$("#camera_webgl")[0].setAttribute("class", "camera video_1");
			$("#camera_webgl2")[0].setAttribute("class", "camera video_1");
			$("#camera_webgl3")[0].setAttribute("class", "camera video_1");
			$("#camera_webgl4")[0].setAttribute("class", "camera video_1");
			
			$("#camera_1")[0].setAttribute("class", "camera_1");
			$("#camera_2")[0].setAttribute("class", "camera_1");
			$("#camera_3")[0].setAttribute("class", "camera_1");
			$("#camera_4")[0].setAttribute("class", "camera_1");
			
			//On centre la photo (a peu pres...)
			$("#camera_info")[0].setAttribute("class", "camera_info_2 polaroid");
		} else {
			g_nb_take_photo = 4;
			g_camRation = 1.5; //1,5 fois plus haut que long
			g_camRationDirection = 'h';
			//On passe a 4 camera
			$("#camera_tab_1_1")[0].setAttribute("class", ""); 
			$("#camera_tab_1_2")[0].setAttribute("class", "");
			$("#camera_tab_2_1")[0].setAttribute("class", "");
			$("#camera_tab_2_2")[0].setAttribute("class", "");
			//On change le dispositif des camera
			$("#camera_webgl")[0].setAttribute("class", "camera video_4");
			$("#camera_webgl2")[0].setAttribute("class", "camera video_4");
			$("#camera_webgl3")[0].setAttribute("class", "camera video_4");
			$("#camera_webgl4")[0].setAttribute("class", "camera video_4");
			
			$("#camera_1")[0].setAttribute("class", "camera_4");
			$("#camera_2")[0].setAttribute("class", "camera_4");
			$("#camera_3")[0].setAttribute("class", "camera_4");
			$("#camera_4")[0].setAttribute("class", "camera_4");
			
			//On centre la photo (a peu pres...)
			$("#camera_info")[0].setAttribute("class", "camera_info polaroid");
		}
	}
	
	
	function getEffectValue(out_min, out_max) {
		return (g_effect_value - g_min_effet) * (out_max - out_min) / (g_max_effet - g_min_effet) + out_min;
	}
	
	/**
	*	Passe a l'effet suivant
	*/
	
	function change_filter() {
		effect_id++;
	
		var effect = effect_filter[effect_id % effect_filter.length];
		if (effect != null) {
			effect();
		}
	}
	
	function change_filter_min() {
		effect_id--;
		if (effect_id < 0) {
			effect_id = effect_filter.length - 1;
		}
		
		var effect = effect_filter[effect_id % effect_filter.length];
		if (effect != null) {
			effect();
		}
	}
	
	/**
	*	Function qui sert de base a un effet glx
	*	A appeler avant un effet GLX
	*/
	
	function base_glfx_effect() {
		//On cherche si un objet webgl est deja présent
		var canvas = document.getElementById('camera_webgl');
		//var video = $("#camera_direct")[0];
		
		//On met a jour les compteurs
		if (interval_id != 0) {
			clearInterval(interval_id);
			interval_id = 0;
		}

		return canvas;
	}
	
	/**********************************************************
	************
	************	LES EFFETS 
	************
	**********************************************************/

	
	/** Effet vierge */
	function null_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];
			if (current_texture != null) {
				current_texture.loadContentsOf(video);
				c.draw(current_texture).update();
			}
		}
		
		applyEffect(effect);
		effect_id = 0; //pour la reinitialisation
		$("#effect_info").html("Normal");
	}
	
	/** Effet grayscale */
	function grayscale_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];
			current_texture.loadContentsOf(video);
			c.draw(current_texture).hueSaturation(-1, -1).update();
		}
		
		applyEffect(effect);
		
		$("#effect_info").html("Noir et Blanc");
	}
	
	/** Effet saturation */
	function saturation_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];
			current_texture.loadContentsOf(video);
			var effect_value = getEffectValue(-1, 1);
			c.draw(current_texture).hueSaturation(0, effect_value).update();
		}
		
		applyEffect(effect);
		
		g_effect_value = g_max_effet / 2; //on met l'effet au max
		
		$("#effect_info").html("Chaud / Froid");
	}

	/** Effet couleur */
	function color_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];
			current_texture.loadContentsOf(video);
			var effect_value = getEffectValue(-1, 1);
			c.draw(current_texture).hueSaturation(effect_value, 0).update();
		}
		
		g_effect_value = g_max_effet / 3; //on met l'effet au max
		
		applyEffect(effect);
		
		$("#effect_info").html("Couleur");
	}		
	
	/** Effet sepia */
	function sepia_effect() {
		
		function effect(c) {
			var video = $("#camera_direct")[0];
			current_texture.loadContentsOf(video);
			var effect_value = getEffectValue(0, 1);
			c.draw(current_texture).sepia(effect_value).update();
		}
		
		g_effect_value = g_max_effet;
		
		applyEffect(effect);
		
		$("#effect_info").html("Sepia");
	}
	
	/** Effet invert */
	function invert_effect() {	
		function effect(c) {
			var video = $("#camera_direct")[0];
			current_texture.loadContentsOf(video);
			c.draw(current_texture).hueSaturation(1, 0).update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Inversé");
	}
	
	function pastel_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];
			current_texture.loadContentsOf(video);
			c.draw(current_texture).denoise(24).update();
		}
		
		applyEffect(effect);
		
		$("#effect_info").html("Pastel");
	}
	
	/** Effet de torsion */
	function swirl_effect() {		
		function effect(c) {
			var canvas = document.getElementById('camera_webgl');
			var video = $("#camera_direct")[0];
			current_texture.loadContentsOf(video);
			var effect_value = getEffectValue(-4, 4);
			
			c.draw(current_texture).swirl(canvas.width / 2, canvas.height / 2, 200, effect_value).update();
		}

		applyEffect(effect);
		
		g_effect_value = g_max_effet / 3;
		
		$("#effect_info").html("Torsion");
	}
	
	/** Effet bulle au milieu */
	function bulb_effect() {
		function effect(c) {
			var canvas = document.getElementById('camera_webgl');
			var video = $("#camera_direct")[0];
			current_texture.loadContentsOf(video);
			c.draw(current_texture).bulgePinch(canvas.width / 2, canvas.height / 2, 188, 0.63).update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Bulle");
	}
	
	/** Effet Fisheyes */
	function fisheyes_effect() {
		function effect(c) {
			var canvas = document.getElementById('camera_webgl');
			var video = $("#camera_direct")[0];
			current_texture.loadContentsOf(video);
			var effect_value = getEffectValue(-1, 1);
			c.draw(current_texture).bulgePinch(canvas.width / 2, canvas.height / 2, canvas.height / 2, effect_value).update();
		}

		applyEffect(effect);
		g_effect_value = g_max_effet / 4 * 3;
		
		
		$("#effect_info").html("Bulle");
	}
	
	/** Effet pincement au milieu */
	function pinch_effect() {
		function effect(c) {
			var canvas = document.getElementById('camera_webgl');
			var video = $("#camera_direct")[0];
			current_texture.loadContentsOf(video);
			var effect_value = getEffectValue(-1, 1);
			c.draw(current_texture).bulgePinch(canvas.width / 2, canvas.height / 2, canvas.height / 2, effect_value).update();
		}

		applyEffect(effect);
		
		g_effect_value = g_max_effet / 4;
		
		$("#effect_info").html("Pincement");
	}
	
	/** Effet de bulb et de pinch */
	function bulb_pinch_effect() {

		function effect(c) {
			var canvas = document.getElementById('camera_webgl');
			var video = $("#camera_direct")[0];
			current_texture.loadContentsOf(video);
			var effect_value = getEffectValue(-1, 1);
			c.draw(current_texture).bulgePinch(canvas.width / 7 * 3, canvas.height / 3, 120, effect_value)
										.bulgePinch(canvas.width / 2, canvas.height / 3 * 2, 200, -effect_value).update();
		}

		applyEffect(effect);
		
		g_effect_value = -(g_max_effet / 4);
		

		
		$("#effect_info").html("Informaticien");
	}
	
	/** Effet de tete carrée */
	function square_effect() {
		function effect(c) {
			var canvas = document.getElementById('camera_webgl');
			var video = $("#camera_direct")[0];
			current_texture.loadContentsOf(video);
			c.draw(current_texture).bulgePinch(canvas.width / 2, canvas.height, canvas.height / 3, 1)
							.bulgePinch(canvas.width, canvas.height / 2, canvas.width / 3, 1)
							.bulgePinch(0, canvas.height / 2, canvas.width / 3, 1)
							.bulgePinch(canvas.width / 2, 0, canvas.height / 3, 1)
							.update();
		}
		
		applyEffect(effect);
		
		$("#effect_info").html("Carree");
	}
	
	/** Effet de dessin */
	function ink_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).sepia(1).ink(0.30).update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Dessin");
	}
	
	function edge_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).edgeWork(10).update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Contours");
	}	
	
	
	function hexa_effect() {
		function effect(c) {
			var canvas = document.getElementById('camera_webgl');
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).hexagonalPixelate(canvas.width / 3, canvas.height / 3, 12).update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Mosaique");
	}
	
	function dot_effect() {
		function effect(c) {
			var canvas = document.getElementById('camera_webgl');
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).dotScreen(canvas.width / 3, canvas.height / 3, 1.33, 3).update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Points");
	}	
	
	function popart_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).sepia(1).update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Pop Art");
	}
	
	function nashville_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).vignette(0.41, 0.32)
									.curves([ [0.00,0.22] , [0.11,0.22] , [0.25,0.36] , [0.36,0.60] , [0.50,0.79] , [0.55,0.84] , [0.65,0.91] , [0.75,0.96] , [0.88,0.99] , [0.94,1.00] , [1.00,1.00] ] , 
											[ [0.00,0.15] , [0.06,0.19] , [0.12,0.27] , [0.25,0.44] , [0.36,0.58] , [0.50,0.70] , [0.55,0.74] , [0.65,0.79] , [0.75,0.83] , [0.88,0.86] , [0.94,0.87] , [1.00,0.87] ] , 
											[ [0.00,0.38] , [0.06,0.42] , [0.12,0.46] , [0.25,0.52] , [0.36,0.56] , [0.50,0.62] , [0.55,0.62] , [0.65,0.65] , [0.75,0.65] , [0.88,0.68] , [0.94,0.69] , [1.00,0.69] ])
									.update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Nashville");
	}
	
	function mille_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).vignette(0.41, 0.32)
									.curves([ [0.13,0.23] , [0.25,0.31] , [0.36,0.44] , [0.50,0.60] , [0.55,0.66] , [0.64,0.79] , [0.75,0.84] , [0.88,0.84] , [0.94,0.84] , [1.00,0.83] ] , [ [0.13,0.16] , [0.25,0.20] , [0.36,0.30] , [0.50,0.44] , [0.55,0.49] , [0.64,0.58] , [0.75,0.71] , [0.88,0.85] , [0.94,0.93] , [1.00,1.00] ] , [ [0.16,0.18] , [0.25,0.22] , [0.36,0.33] , [0.50,0.50] , [0.55,0.56] , [0.64,0.68] , [0.75,0.77] , [0.88,0.78] , [0.94,0.77] , [1.00,0.78] ])
									.update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("1977");
	}
	
	function alien_burn_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).curves([ [0.00,0.00] , [0.30,0.30] , [0.36,0.45] , [0.80,0.76] , [1.00,1.00] ] , [ [0.02,0.00] , [0.44,0.25] , [0.64,0.55] , [1.00,1.00] ] , [ [0.05,0.00] , [0.55,0.54] , [1.00,1.00] ])
									.update();
		}
		
		applyEffect(effect);
		
		$("#effect_info").html("Alien Burn");
	}
	
	function brannan_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).vignette(0.41, 0.32)
									.curves([ [0.00,0.20] , [0.06,0.20] , [0.13,0.27] , [0.23,0.33] , [0.36,0.47] , [0.50,0.67] , [0.55,0.73] , [0.65,0.88] , [0.75,0.96] , [0.88,1.00] , [0.96,1.00] , [1.00,1.00] ] , [ [0.00,0.00] , [0.06,0.01] , [0.13,0.07] , [0.25,0.23] , [0.36,0.45] , [0.50,0.71] , [0.65,0.83] , [0.75,0.89] , [0.88,0.94] , [0.96,0.97] , [1.00,0.99] ] , [ [0.00,0.19] , [0.06,0.20] , [0.24,0.30] , [0.36,0.43] , [0.50,0.56] , [0.55,0.60] , [0.65,0.71] , [0.75,0.75] , [0.88,0.85] , [0.96,0.88] , [1.00,0.88] ])
									.update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Brannan");
	}	
	
	function california_gold_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).vignette(0.41, 0.32)
									.curves([ [0.00,0.00] , [0.42,0.68] , [1.00,1.00] ] , [ [0.00,0.00] , [0.25,0.27] , [0.45,0.45] , [0.59,0.66] , [0.69,0.74] , [1.00,1.00] ] , [ [0.00,0.00] , [0.46,0.36] , [0.71,0.55] , [0.90,0.62] , [1.00,1.00] ])
									.update();
		}
		
		applyEffect(effect);
		
		$("#effect_info").html("California Gold");
	}
	
	function country_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).vignette(0.41, 0.32)
									.curves([ [0.00,0.00] , [0.33,0.32] , [0.36,0.42] , [1.00,1.00] ] , [ [0.00,0.00] , [0.42,0.42] , [0.48,0.53] , [1.00,1.00] ] , [ [0.00,0.00] , [0.37,0.36] , [0.48,0.45] , [1.00,1.00] ])
									.update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Country");
	}

	function crossprocess_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).curves([ [0.00,0.00] , [0.22,0.09] , [0.83,1.00] ] , [ [0.00,0.00] , [0.22,0.15] , [0.82,0.89] , [1.00,1.00] ] , [ [0.00,0.08] , [1.00,0.92] ])
									.update();
		}
		
		applyEffect(effect);
		
		$("#effect_info").html("Cross Process");
	}

	function desert_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).vignette(0.41, 0.32)
									.curves([ [0.00,0.00] , [0.23,0.19] , [0.47,0.53] , [0.65,0.72] , [1.00,1.00] ] , [ [0.00,0.00] , [0.20,0.23] , [0.46,0.40] , [0.76,0.78] , [1.00,1.00] ] , [ [0.00,0.00] , [0.26,0.16] , [0.54,0.50] , [0.76,0.72] , [1.00,1.00] ])
									.update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Desert");
	}
	
	function gotham_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).vignette(0.41, 0.32)
									.unsharpMask(40, 3)
									.curves([ [0.00,0.00] , [0.06,0.01] , [0.25,0.10] , [0.36,0.16] , [0.50,0.26] , [0.55,0.33] , [0.64,0.45] , [0.75,0.65] , [0.88,0.84] , [0.94,0.92] , [1.00,1.00] ] , [ [0.00,0.00] , [0.06,0.01] , [0.25,0.07] , [0.36,0.15] , [0.50,0.28] , [0.55,0.34] , [0.64,0.47] , [0.75,0.65] , [0.88,0.83] , [0.94,0.91] , [1.00,1.00] ] , [ [0.00,0.00] , [0.06,0.00] , [0.25,0.09] , [0.36,0.19] , [0.50,0.35] , [0.55,0.39] , [0.64,0.49] , [0.75,0.59] , [0.88,0.77] , [0.94,0.89] , [1.00,1.00] ])
									.hueSaturation(0, -0.9)
									.update();
		}
		
		applyEffect(effect);
		
		$("#effect_info").html("Gotham");
	}
	
	function lord_kevin_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture).vignette(0.41, 0.32)
									.curves([ [0.00,0.17] , [0.06,0.26] , [0.13,0.36] , [0.25,0.58] , [0.36,0.74] , [0.50,0.85] , [0.55,0.89] , [0.64,0.93] , [0.75,0.96] , [1.00,1.00] ] , [ [0.00,0.14] , [0.06,0.15] , [0.13,0.18] , [0.25,0.31] , [0.36,0.43] , [0.50,0.57] , [0.55,0.62] , [0.64,0.67] , [0.75,0.72] , [1.00,0.76] ] , [ [0.00,0.27] , [0.06,0.27] , [0.13,0.27] , [0.25,0.27] , [0.36,0.32] , [0.50,0.38] , [0.55,0.40] , [0.64,0.43] , [0.75,0.46] , [1.00,0.49] ])
									.update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Lord Kevin");
	}
	
	function hefe_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture)	.curves([ [0.00,0.13] , [0.06,0.13] , [0.13,0.24] , [0.25,0.47] , [0.36,0.65] , [0.50,0.80] , [0.55,0.82] , [0.64,0.87] , [0.75,0.91] , [0.88,0.96] , [0.94,0.99] , [1.00,0.99] ] , [ [0.00,0.00] , [0.06,0.00] , [0.13,0.06] , [0.25,0.25] , [0.36,0.51] , [0.50,0.75] , [0.55,0.80] , [0.64,0.85] , [0.75,0.89] , [0.88,0.95] , [0.94,0.99] , [1.00,0.99] ] , [ [0.00,0.01] , [0.13,0.04] , [0.25,0.15] , [0.36,0.36] , [0.50,0.59] , [0.55,0.67] , [0.64,0.77] , [0.75,0.82] , [0.88,0.87] , [0.94,0.89] , [1.00,0.89] ])
									.update();
		}
		
		applyEffect(effect);
		
		$("#effect_info").html("Hefe");
	}
	
	function lumo_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture)	.curves([ [0.00,0.00] , [0.29,0.22] , [0.69,0.81] , [1.00,1.00] ] , [ [0.00,0.00] , [0.29,0.21] , [0.70,0.81] , [1.00,1.00] ] , [ [0.00,0.00] , [0.19,0.31] , [0.79,0.71] , [1.00,1.00] ])
									.update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Lumo");
	}
	
	function nashville_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture)	.curves([ [0.00,0.22] , [0.11,0.22] , [0.25,0.36] , [0.36,0.60] , [0.50,0.79] , [0.55,0.84] , [0.65,0.91] , [0.75,0.96] , [0.88,0.99] , [0.94,1.00] , [1.00,1.00] ] , [ [0.00,0.15] , [0.06,0.19] , [0.12,0.27] , [0.25,0.44] , [0.36,0.58] , [0.50,0.70] , [0.55,0.74] , [0.65,0.79] , [0.75,0.83] , [0.88,0.86] , [0.94,0.87] , [1.00,0.87] ] , [ [0.00,0.38] , [0.06,0.42] , [0.12,0.46] , [0.25,0.52] , [0.36,0.56] , [0.50,0.62] , [0.55,0.62] , [0.65,0.65] , [0.75,0.65] , [0.88,0.68] , [0.94,0.69] , [1.00,0.69] ])
									.update();
		}
		
		applyEffect(effect);
		
		$("#effect_info").html("Nashville");
	}
	
	function hollywood_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture)	.curves([ [0.00,0.00] , [0.40,0.37] , [0.67,0.74] , [1.00,1.00] ] , [ [0.00,0.00] , [0.22,0.17] , [0.45,0.42] , [0.70,0.65] , [1.00,1.00] ] , [ [0.00,0.00] , [0.22,0.11] , [0.32,0.40] , [0.61,0.59] , [1.00,1.00] ])
									.update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Hollywood");
	}

	function portraesque_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture)	.curves([ [0.00,0.00] , [0.16,0.11] , [0.72,0.82] , [1.00,1.00] ] , [ [0.00,0.00] , [0.10,0.08] , [0.37,0.40] , [0.71,0.82] , [1.00,1.00] ] , [ [0.00,0.00] , [0.10,0.08] , [0.48,0.60] , [0.65,0.81] , [1.00,1.00] ])
									.update();
		}
		
		applyEffect(effect);
		
		$("#effect_info").html("Portraesque");
	}
	
	function vintage_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture)	.vignette(0.41, 0.32)
									.curves([ [0.00,0.00] , [0.32,0.24] , [0.70,0.77] , [1.00,1.00] ] , [ [0.00,0.00] , [0.36,0.41] , [0.60,0.53] , [1.00,1.00] ] , [ [0.00,0.00] , [0.36,0.39] , [0.61,0.69] , [1.00,1.00] ])
									.update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Vintage");
	}	

	function proviaesque_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture)	.curves([ [0.00,0.00] , [0.23,0.21] , [0.79,0.82] , [1.00,1.00] ] , [ [0.00,0.00] , [0.11,0.08] , [0.77,0.81] , [1.00,1.00] ] , [ [0.00,0.00] , [0.14,0.10] , [0.80,0.89] , [1.00,1.00] ])
									.update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Proviaesque");
	}
	
	function dreamWorld_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture)	.curves([ [0.00,0.00] , [0.26,0.22] , [0.37,0.32] , [0.62,0.41] , [0.76,0.73] , [1.00,1.00] ] , [ [0.00,0.00] , [0.33,0.41] , [0.46,0.70] , [0.67,0.66] , [1.00,1.00] ] , [ [0.00,0.00] , [0.40,0.31] , [0.52,0.55] , [0.67,0.65] , [0.83,0.81] , [1.00,1.00] ])
									.update();
		}
		
		applyEffect(effect);
		
		$("#effect_info").html("Dream World");
	}
	
	function valviaesque_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture)	.curves([ [0.00,0.00] , [0.16,0.11] , [0.72,0.82] , [1.00,1.00] ] , [ [0.00,0.00] , [0.10,0.08] , [0.37,0.40] , [0.71,0.82] , [1.00,1.00] ] , [ [0.00,0.00] , [0.10,0.08] , [0.48,0.60] , [0.65,0.81] , [1.00,1.00] ])
									.update();
		}

		applyEffect(effect);
		
		$("#effect_info").html("Valviaesque");
	}

	function xpro_effect() {
		function effect(c) {
			var video = $("#camera_direct")[0];		
			current_texture.loadContentsOf(video);
			c.draw(current_texture)	.curves([ [0.00,0.00] , [0.06,0.00] , [0.13,0.01] , [0.25,0.09] , [0.36,0.24] , [0.50,0.50] , [0.55,0.59] , [0.64,0.77] , [0.75,0.91] , [0.88,0.99] , [0.94,1.00] , [1.00,1.00] ] , [ [0.00,0.00] , [0.13,0.01] , [0.25,0.09] , [0.36,0.23] , [0.50,0.50] , [0.55,0.60] , [0.64,0.76] , [0.75,0.91] , [0.88,0.99] , [0.94,1.00] , [1.00,1.00] ] , [ [0.00,0.09] , [0.06,0.15] , [0.13,0.20] , [0.25,0.29] , [0.36,0.38] , [0.50,0.50] , [0.55,0.53] , [0.64,0.62] , [0.75,0.71] , [0.88,0.80] , [0.94,0.85] , [1.00,0.89] ])
									.update();
		}
		
		applyEffect(effect);
		
		$("#effect_info").html("X-Pro");
	}		
	
	function applyEffect(effect) {
		var canvas = base_glfx_effect();
		var canvas2 = document.getElementById('camera_webgl2');
		var canvas3 = document.getElementById('camera_webgl3');
		var canvas4 = document.getElementById('camera_webgl4');

		var cam = $("#camera")[0];
		
		interval_id = setInterval(function() {
			if (cam.style.display == 'block') { //on ne met a jour l'affichage que si on doit l'afficher
				if ("" != canvas) {
					if (canvas != null) {
						effect(canvas);
					}
				}
		
				if ("" != canvas2) {
					if (current_texture2 != null) {
						current_texture2.loadContentsOf(canvas);
						if (canvas2 != null) {
							canvas2.draw(current_texture2).update();
						}
					}
				}
				if ("" != canvas3) {
					if (current_texture3 != null) {
						current_texture3.loadContentsOf(canvas);
						if (canvas3 != null) {
							canvas3.draw(current_texture3).update();
						}
					}
				}
				if ("" != canvas4) {
					if (current_texture4 != null) {
						current_texture4.loadContentsOf(canvas);
						if (canvas4 != null) {
							canvas4.draw(current_texture4).update();
						}
					}
				}
			}
		}, refresh_rate);
	}	
	