// Inicializo Samid:
var samid;

var optionsSamid = {
  'idx': 0,
  'nombre': 'Samid',
  'img': {
    'ataque': 'images/samid-ataque.gif',
    'defensa': 'images/samid-defensa.gif',
    'inactivo': 'images/samid-reposo.gif',
    'golpe': 'images/samid-golpe.gif',
    'muerte': 'images/samid-muerto.png'
  }
};

var PlayerHandler = function (player1, player2) {
  this.manageGame = function() {
    if(player1.turno){
      player1.doTurno();
    }else {
      player2.doTurno();
    }

  }
};

var Player = function(optionPersonaje) {
  var turno = true;
  var personaje = new Personaje(optionPersonaje);
  personaje.init();

  this.doTurno = function() {
    var option = this.launchOptions();
    this.turno = false;
  };

  this.launchOptions = function() {
    var option = "ataque";
    bootbox.dialog({
      message: "¿Qué queré hacer?" + personaje.nombre,
      title: "Combate Space",
      onEscape: function() {
      },
      show: true,
      backdrop: true,
      closeButton: true,
      animate: true,
      className: "my-modal",
      buttons: {
        "Atacar": function() {personaje.ataque()},
        "Defender": function() {personaje.defensa()}
      }
    });

  };

};


// Init general
$(document).ready(function(){
  bootbox.dialog({
    message: "¿Vamos a Juegar?",
    title: "Combate Space",
    show: true,
    backdrop: true,
    closeButton: true,
    animate: true,
    buttons: {
      "Juegar": function() {
        var player1 = new Player(optionsSamid);
        var player2 = new Player(optionsSamid);
        var playerHandler = new PlayerHandler(player1, player2);
        playerHandler.manageGame();
      }
    }
  });
});