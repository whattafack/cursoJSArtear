var templatePersonaje = '<div id="personaje1" class="personaje">\
                <div id="ataque">\
                  <img src="<%= ataque %>" />\
                </div>\
                <div id="defensa">\
                  <img src="<%= defensa %>" />\
                </div>\
                <div id="inactivo">\
                  <img src="<%= inactivo %>" />\
                </div>\
                <div id="golpe">\
                  <img src="<%= golpe %>" />\
                </div>\
                <div id="muerte">\
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
  }

  // Inicio del personaje
  this.init = function(){
    $($('.name')[this.idx]).html(this.nombre);

    // creo el template del personaje
    var charObject = {
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
    var cantidadDanio = Math.floor(Math.random() * 10);
    return cantidadDanio;
  };

  // Metodo de Defensa - Saco un random y lo retorno como puntos de defensa
  this.defensa = function(){
    var cantidadAguante = Math.floor(Math.random() * 10);
    this.estaDefendiendo = {
      'estado': true,
      'cantidad': cantidadAguante
    };
  };

  // Metodo de cuando recibo un ataque
  // Si defiendo, debo minimizar el ataque en el estado de defensa que tengo storeado
  // Si me atacan sin defensa... minimizar los puntos de vida
  this.ouch = function(cantidad){
    if (this.estaDefendiendo.estado){
      cantidad = cantidad - this.estaDefendiendo.cantidadAguante;
      this.vida-= cantidad;
      this.estaDefendiendo = {
        'estado': false,
        'cantidad': 0
      };
    } else {
      this.vida-= cantidad;
    }
    
  };
};