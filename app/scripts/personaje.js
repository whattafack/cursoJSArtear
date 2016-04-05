var templatePersonaje = '<div id="personaje-<%= id %>" class="personaje">\
                <div class="ataque">\
                  <img src="<%= ataque %>" />\
                </div>\
                <div class="defensa">\
                  <img src="<%= defensa %>" />\
                </div>\
                <div class="inactivo">\
                  <img src="<%= inactivo %>" />\
                </div>\
                <div class="golpe">\
                  <img src="<%= golpe %>" />\
                </div>\
                <div class="muerte">\
                  <img src="<%= muerte %>" />\
                </div>\
              </div>';


/* Personaje >> Atacar o Defender

Atacar > Random de un numero y ejecuta > Random es lo que saca de vida
Defender > Siguiente ataque, deberia estar disminuido por un random de defensa || A disminuye el N puntos del ataque de B */

var Personaje = function (options){
  /*
    Estados:
    - Reposo
    - Golpe > Random de un number
    - Defensa > Random > Minimizar el siguiente ataque en N puntos
    - Recibe Golpe > Sacar vida
    - Muerte > 0

    - Si vida < 20% -> Movimiento especial
  */

  // Su Nombre
  this.nombre = options.nombre ? options.nombre : "Player 1";

  // Cantidad de Vida
  this.vida = 100;

  // ID de personaje
  this.idx = options.idx;

  // si se defiende... Que porcentaje? Guardarlo a nivel global, temporalmente
  this.estaDefendiendo = {
    'estado': false,
    'cantidad': 0
  };

  this.cantidadDanio = 0;

  // Inicio del personaje
  this.init = function(){
    $($('.name')[this.idx]).html(this.nombre);

    // creo el template del personaje
    var charObject = {
      id: this.idx,
      ataque: options.img.ataque,
      defensa: options.img.defensa,
      inactivo: options.img.inactivo,
      golpe: options.img.golpe,
      muerte: options.img.muerte
    };

    var charToy = _.template(templatePersonaje)(charObject);

    // Lo appendeo
    $('#characters').append(charToy);

  };


  // Metodo de Ataque - Saco un random y lo retorno como puntos de ataque
  this.ataque = function(){
    this.cantidadDanio = Math.floor(Math.random() * 30);
    this.changeGraphic('ataque');
  };

  this.resetDanio = function() {
    this.cantidadDanio = 0;
  };

  // Metodo de Defensa - Saco un random y lo retorno como puntos de defensa
  this.defensa = function(){
    var cantidadAguante = Math.floor(Math.random() * 15);
    this.estaDefendiendo = {
      'estado': true,
      'cantidad': cantidadAguante
    };
    this.changeGraphic('defensa');
  };

  // Metodo de cuando recibo un ataque
  // Si defiendo, debo minimizar el ataque en el estado de defensa que tengo storeado
  // Si me atacan sin defensa... minimizar los puntos de vida
  this.ouch = function(cantidad){
    if (this.estaDefendiendo.estado){
      cantidad = cantidad - this.estaDefendiendo.cantidadAguante;
      this.estaDefendiendo = {
        'estado': false,
        'cantidad': 0
      };
    }
    this.changeGraphic('golpe');
    this.sacaVida(cantidad);
  };

  // Oculta todos los graficos y muestra el estado requerido
  this.changeGraphic = function(estado){
    $('#personaje-' + this.idx + ' div').hide();
    switch (estado){
      case 'ataque':
        $('#personaje-' + this.idx + ' .ataque').show();
      break;
      case 'defensa':
        $('#personaje-' + this.idx + ' .defensa').show();
      break;
      case 'inactivo':
        $('#personaje-' + this.idx + ' .inactivo').show();
      break;
      case 'golpe':
        $('#personaje-' + this.idx + ' .golpe').show();
      break;
      case 'muerte':
        $('#personaje-' + this.idx + ' .muerte').show();
      break;
      default:
        $('#personaje-' + this.idx + ' .inactivo').show();
    }
    if (estado == 'golpe' || estado == 'ataque'){
      var indx = this.idx;
      setTimeout(function(){
        $('#personaje-' + indx + ' div').hide();
        $('#personaje-' + indx + ' .inactivo').show();
      },1000);
    }
  };

  // Saca vida en la Barra
  this.sacaVida = function(cantidad){
    this.vida-= cantidad;

    $($('.progress-bar-danger')[this.idx]).width(this.vida+'%');

    if(this.vida <= 0){
      // SE MURIO!
      $('#red').css('opacity','0.5');
      this.changeGraphic('muerte');
    }
  };

  this.getVida = function() {
    return this.vida;
  };
};
