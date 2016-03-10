var Player = function () {
    var videoPlayer;

    var self = this;

    //@Method: para crear un player de Youtube
    self.createYoutubePlayer = function (idVideo) {
        // Replace the 'ytplayer' element with an <iframe> and
        // YouTube player after the API code downloads.
        videoPlayer = new YT.Player('background_video', {
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

    //@Method: para cambiar un video de Youtube a un player ya creado.
    self.changeVideo = function (idVideo) {
        videoPlayer.loadVideoById(idVideo);
    };

    //@Method: para ejecutar cuando el player de Youtube esta listo (reproduce video)
    self.onPlayerReady = function (event) {
        event.target.playVideo();
    };

    //@Method: Switch para ver que video me corresponde de acuerdo al clima
    self.switchVideo = function (weatherType) {
        var idVideo;
        switch (weatherType) {
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
        return idVideo;
    };

    //@Method: que devuelve true or false si existe un player creado.
    self.hasCreatedVideo = function () {
        return typeof videoPlayer === "undefined";
    }
};