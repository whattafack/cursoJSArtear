/* Personaje >> Atacar o Defender

Atacar > Random de un numero y ejecuta > Random es lo que saca de vida
Defender > Siguiente ataque, deberia estar disminuido por un random de defensa || A > B --- Pega  || A disminuye el N % del ataque de B */

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

var options = {
  'idx': 1,
  'nombre': 'Samid',
  'img': {
    'ataque': 'images/samid-ataque.gif',
    'defensa': 'images/samid-defensa.gif',
    'inactivo': 'images/samid-reposo.gif',
    'golpe': 'images/samid-golpe.gif',
    'muerte': 'images/samid-muerto.png'
  }
}
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

  this.nombre = options.nombre ? options.nombre : "Player 1";
  this.vida = 100;
  this.idx = options.idx;

  this.init = function(){
    $('name'[this.idx]).html(this.nombre);

    var charObject = {
      ataque: options.img.ataque,
      defensa: options.img.defensa,
      inactivo: options.img.inactivo,
      golpe: options.img.golpe,
      muerte: options.img.muerte
    };

    var charToy = _.template(templatePersonaje)(charObject);
    $('#characters').append(charToy);
    
  };

};

var samid;

$(document).ready(function(){
  samid = new Personaje(options);
  samid.init();
});