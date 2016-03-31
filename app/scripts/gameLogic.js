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

var optionsMauro = {
  'idx': 1,
  'nombre': 'Mauro',
  'img': {
    'ataque': 'images/mauro-ataque.gif',
    'defensa': 'images/mauro-defensa.gif',
    'inactivo': 'images/mauro-reposo.gif',
    'golpe': 'images/mauro-golpe.gif',
    'muerte': 'images/mauro-muerto.png'
  }
};

var PlayerHandler = function (player1, player2) {
  this.manageGame = function() {

    //while (player1.getVida() > 0 && player2.getVida() > 0) {
    for(var i = 0; i<4; i++) {
      if (player1.turno == true) {
        doTurno(player1);
        console.log(player1.personaje.cantidadDanio, player1.personaje.vida);
        player2.reduce(player1.cantidadDanio);
        player1.personaje.resetDanio();
        player2.turno = true;
      } else {
        doTurno(player1);
        player1.reduce(player2.personaje.cantidadDanio, player2.personaje.vida);
        player2.personaje.resetDanio();
        player1.turno = true;
      }
    }
  }
};


function doTurno(personaje) {
  launchOptions(function(res){
    if(res === "ataque") {
      console.log("personaje",personaje);
      personaje.ataque();
    } else {
      personaje.defensa();
    }
  });
}

function launchOptions(callback, personaje) {
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
      "Atacar": function() {callback("ataque")},
      "Defender": function() {callback("defensa")}
    }
  });
}


var Player = function(optionPersonaje) {

  Player.prototype.turno = true;

  this.personaje = new Personaje(optionPersonaje);
  this.personaje.init();



  this.getVida = function() {
    return this.personaje.vida;
  };

  this.reduce = function(cant) {
    this.personaje.sacaVida(cant);
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
        var player2 = new Player(optionsMauro);
        var playerHandler = new PlayerHandler(player1, player2);

        setTimeout(function() {
          playerHandler.manageGame();
        }, 500);
      }
    }
  });
});
