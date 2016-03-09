var clima = function(){
	var self = this;
	 var player;

	self.init = function(){
		$('.btn').click(self.buscoClimaPorCiudad);
	};

	self.buscoClimaPorCiudad = function(){
		// data en : http://www.w3schools.com/jquery/html_val.asp
		//           http://www.w3schools.com/jsref/jsref_replace.asp
		var ciudad = $('.form-control').val().replace(" ","%20");

		// data en : http://api.jquery.com/jquery.ajax/
		$.ajax({
		  method: "POST",
		  url: "http://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "&appid=44db6a862fba0b067b1930da0d769e98&units=metric&lang=es",
		})
		  .done(function( data ) {
		  	/*
				grnd_level:1024.88
				humidity:60
				pressure:1024.88
				sea_level:1026.3
				temp: 25.96
				temp_max: 25.96
				temp_min: 25.96
		  	*/

		  	// Populo con los datos recibidos
		  	$('#temperatura').html(data.main.temp + " °");
		  	$('#maxima').html(data.main.temp_max + " °");
		  	$('#minima').html(data.main.temp_min + " °");
		  	$('#humedad').html(data.main.humidity + " %");
		  	$('#img_estado').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');

		  	// Muestro el Panel
		  	if (!$('paneles').is(':visible')){
		    	$('.paneles').fadeIn('slow');
		  	}

		  	//Diferentes tipos:
		  	var idVideo;

			switch(data.weather[0].main) {
				case 'Thunderstorm':
					idVideo = 'CsyLQUas4eM';
				break;

				case 'Drizzle':
					idVideo = 'oElmCxdiq1A';
				break;

				case 'Rain':
					idVideo = 'GquEnoqZAK0';
				break;

				case 'Snow':
					idVideo = 'fsmRppcAwjg';
				break;

				case 'Atmosphere':
					idVideo = 'vvbN-cWe0A0';
				break;

				case 'Clear':
					idVideo = 'qREKP9oijWI';
				break;

				case 'Clouds':
					idVideo = 'r1xohS2u69E';
				break;

				case 'Extreme':
					idVideo = 'lCnTGe74Qf8';
				break;

				default:
					idVideo = 'lQqSc2S_h1I';
				break;
			}

			// Chequeo si existe un player > Lo creo o sino cambio el video
			if ( typeof player === 'undefined' ) {
		  		self.createYoutubePlayer(idVideo);
			} else {
				self.changeVideo(idVideo);
			}
		});
	};

	self.createYoutubePlayer = function(idVideo){
	  // Replace the 'ytplayer' element with an <iframe> and
	  // YouTube player after the API code downloads.
	    player = new YT.Player('background_video', {
	      height: '1024',
	      width: '768',
	      videoId: idVideo,
	      controls: 0,
	      modestbranding: 1,
	      events: {
		    'onReady': self.onPlayerReady,
		  }
	    });
	};

	self.changeVideo = function(idVideo){
		player.loadVideoById(idVideo);
	}

	self.onPlayerReady = function(event) {
		event.target.playVideo();
	}
}