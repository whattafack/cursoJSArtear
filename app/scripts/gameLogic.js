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
  this.manageGame = function () {
    console.log(player1.getVida(), player2.getVida());
    if (player1.getVida() > 0 && player2.getVida() > 0) {

      if (player1.turno == true) {
        doTurno(player1, function () {
          player1.turno = false;
          player2.reduce(player1.getCantidadDanio());
          player1.resetValor();
          player2.turno = true;
          //this.manageGame();
          setTimeout(function () {
            playerHandler.manageGame();
          }, 2000);
        });
      } else {
        doTurno(player2, function () {
          player2.turno = false;
          player1.reduce(player2.getCantidadDanio());
          player2.resetValor();
          player1.turno = true;
          //this.manageGame();
          setTimeout(function () {
            playerHandler.manageGame();
          }, 2000);
        });
      }

    }
  }
};


function doTurno(personaje,callback) {

  launchOptions(personaje, function(res){
    if(res === "ataque") {
      personaje.callAtaque();
    } else {
      personaje.callDefensa();
    }
    callback();
  });

}

function launchOptions(personaje, callback) {
  bootbox.dialog({
    message: "¿Qué queré hacer?" + personaje.getNombre(),
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

  var personaje = new Personaje(optionPersonaje);

  personaje.init();

  this.getVida = function() {
    return personaje.vida;
  };

  this.reduce = function(cant) {
    personaje.sacaVida(cant);
  };

  this.getCantidadDanio = function() {
    return personaje.cantidadDanio;
  };

  this.resetValor = function() {
    personaje.resetDanio();
  };

  this.getNombre = function() {
    return personaje.nombre;
  };

  this.callAtaque = function() {
    personaje.ataque();
  };

  this.callDefensa = function() {
    personaje.defensa();
  };

};

// Init general
var player1;
var player2;
var playerHandler;

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
        player1 = new Player(optionsSamid);
        player2 = new Player(optionsMauro);
        playerHandler = new PlayerHandler(player1, player2);

        setTimeout(function() {
          playerHandler.manageGame();
        }, 500);
      }
    }
  });
});
