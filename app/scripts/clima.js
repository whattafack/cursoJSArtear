var Clima = function () {
    // Igualo la variable self a this (esta instancia)
    var self = this;

    // Creo una nueva instancia de la clase Player (mas abajo)
    var player = new Player();



    //@Method: Realiza una llamada ajax y en el "done" setea el html populando con los datos recibidos
    self.buscoClimaPorCiudad = function (callback) {
        // data en : http://www.w3schools.com/jquery/html_val.asp
        //           http://www.w3schools.com/jsref/jsref_replace.asp
        var ciudad = $('.form-control').val().replace(" ", "%20");

        // data en : http://api.jquery.com/jquery.ajax/

        //@TODO: realizar el ajax
        $.reemplazameconalgo({
            method: "POST",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "&appid=44db6a862fba0b067b1930da0d769e98&units=metric&lang=es",
        }).done(function (data) {
            callback(data);
        });
    };

    // Init de la clase. Basicamente attacheo eventos del DOM necesarios para que funcione.
    self.init = function () {

        //@TODO: poner la clase del button para que funcione el click
        $('').click(function(){
            self.buscoClimaPorCiudad(function(data){
                // llamo un callback, una vez lista la llamada de datos para el clima
                //@TODO: Popular con los datos recibidos, temperatura, maxima, minima y humedad
                $('#img_estado').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png');

                //Muestro el Panel
                if (!$('paneles').is(':visible')) {
                    $('.paneles').fadeIn('slow');
                }

                // Busco que ID de video me corresponde de acuerdo al clima.
                var idVideo = player.switchVideo(data.weather[0].main);

                //@TODO: chequeo si existe un player > Lo creo o sino cambio el video
            });
        });
    };





};
