"use strict";

console.log("Gonna die while doing this task");


class Human {
  constructor(humanNumber, immunity,   workStatus, infected) {
    this.immunity = immunity;
    this.humanNumber = humanNumber;
    this.workStatus = workStatus;
    this.infected =infected;
  }
}

class Worker extends Human {
  constructor( humanNumber, immunity, homeX, homeY, officeNumber, workStatus, infected,  ) {
    super( humanNumber, immunity,    workStatus, infected);
    this.officeNumber = officeNumber;
    this.homeX = homeX;
    this.homeY = homeY;
  }

   /**
   * Move object one step.
   *
   * @param {number} currentX the current x value of object.
   * @param {number} currentY the current y value of object.
   */
  moveTowardsOffice(currentX ,currentY) {

    console.log("moving from x: " + currentX + " y: " + currentY + "  "+ this.officeNumber);
    console.log(Offices[this.officeNumber]);

    let key1 = {
      x: currentX + 1,
      y : currentY
    }
    let key2 = {
      x: currentX ,
      y : currentY + 1
    }

    if(map.has(key2)) {
      if(map.has(key1)) {
        console.log("next");
      }
      else {
        currentY++;
      }

    }
    else {
      currentX++;
    }

    console.log("moved to x " + currentX + "y " + currentY );

  }
}

class Habitat {

  constructor(rows, cols) {
    this.cols = 1000000;
    this.rows = 1000000;
  }

}


class Office {
  constructor(officeNumber, officeX , officeY) {
    this.officeX = officeX;
    this.officeY = officeY;
    this.officeNumber = officeNumber;

  }

}

class Home extends Habitat {

}


var Offices = [];
//generate offices array
for (let row=0; row<10000; row++  ) {
  let office =  new Office();

  let x = Math.floor(Math.random()* 1000000);
  let y = Math.floor(Math.random()* 1000000);

  if(Offices.find(Element => Element.x == x && Element.y ==y)) { //offices occur only at unique locations
    row--;
  }
  else {
    office.officeX =x;
    office.officeY = y;
    office.officeNumber = row;
    Offices.push(office);
  }

}

console.log(Offices);
console.log('Offices created via array');

var Humans = [];
var check =1;
var objNumber= 1;
var map = new Map();

for (let i=0; i<10; i++){
  let objName =  new Human();
  let key = {
    x: Math.floor(Math.random()* 1000000),
    y: Math.floor(Math.random()* 1000000)
  }
  if (!map.has(key)) { //unique key
    objName.workStatus = Math.random() < 0.3;

    if(objName.workStatus == true) {
      objName = new Worker();
      objName.officeNumber = Math.floor(Math.random()* 10000);;
      objName.humanNumber = objNumber;
      objName.workStatus = true;
      objName.homeX = key.x;
      objName.homeY = key.y;
      objName.infected = Math.random() < 0.3;
      objName.immunity = Math.random().toFixed(2);
    }
    else {
      objName.immunity = Math.random().toFixed(2);
      objName.humanNumber = objNumber;
      objName.infected = Math.random() < 0.3;
    }
    map.set(key, objName);
    objNumber++;
  }
  else {
    i--;
  }

}


console.log(map.size);
console.log(map);
console.log("Map created");


for ( let maps of map ) {
  if(maps[1].constructor.name == "Worker") {

    let x = maps[0].x;
    let y = maps[0].y;

    maps[1].moveTowardsOffice(x,y);
  };
}









