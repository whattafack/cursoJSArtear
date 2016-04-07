
//Constructor de Robot
function Robot(name, year, owner) {
    this.name = name;
    this.year = year;
    this.owner = owner;
}

//atributos publicos de robot
Robot.prototype.maker = "ObjectsRUs";
Robot.prototype.errorMessage = "All systems go.";

//Metodos de robot
Robot.prototype.reportError = function() {
    console.log(this.name + " says " + this.errorMessage);
};

Robot.prototype.spillWater = function() {
    this.errorMessage = "I appear to have a short circuit!";
};

Robot.prototype.makeCoffee = function() {
    console.log("Making coffee");
};

Robot.prototype.blinkLights = function() {
    console.log("Linking Lights");
};

//Constructor de SpaceRobot
function SpaceRobot(name, year, owner, homePlanet) {
    this.name = name;
    this.year = year;
    this.owner = owner;
    this.homePlanet = homePlanet;
}

//Acá le digo que el prototype de SpaceRobot(su parte mas publica) va a heredar todas las capacidades y atributos de Robot
SpaceRobot.prototype = new Robot();


//Metodos de SpaceRobot
SpaceRobot.prototype.speak = function() {
    console.log(this.name + " says Sir, If I may venture an opinion...");
};

SpaceRobot.prototype.pilot = function() {
    console.log(this.name + " says Thrusters? Are they important?");
};


//creo un SpaceRobot
var c3po = new SpaceRobot("C3PO", 1977, "Luke Skywalker", "Tatooine");


c3po.speak();
c3po.pilot();

//c3po.name es de Space Robot perp c3po.maker es atributo de Robot heredado en SpaceRobot
console.log(c3po.name + " was made by " + c3po.maker);


//creo otro SpaceRobot
var simon = new SpaceRobot("Simon", 2009, "Carla Diana", "Earth");


//metodos de Robot heredados por SpaceRobot
simon.makeCoffee();
simon.blinkLights();


//llamo a un metodos de SpaceRobot
simon.speak();