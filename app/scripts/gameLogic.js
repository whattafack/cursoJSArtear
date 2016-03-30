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
}



// Init general
$(document).ready(function(){
  samid = new Personaje(optionsSamid);
  samid.init();
});


/*
Confirm para turnos:

bootbox.confirm("Are you sure?", function(result) {
  Example.show("Confirm result: "+result);
}); 

*/