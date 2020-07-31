"use strict";

/** Class representing a Human. */
class Human {
  constructor(humanNumber, immunity,   workStatus, infected) {
    this.immunity = immunity;
    this.humanNumber = humanNumber;
    this.workStatus = workStatus;
    this.infected =infected;
  }

  /**
   * Move object one step.
   *
   * @param {number} x the current x value of object.
   * @param {number} y the current y value of object.
   * @param {Object} maps
   */
  checkInfection(x,y,maps) {
    let humanObject = this;
    let key = {
      x:x,
      y:y
    };
    console.log(this.immunity);
    console.log(maps);

    if(this.immunity < 0.5) {

      for(let i=x-1; i<=x+1; i++) {
        for(let j=y-1; j<=y+1; j++) {
          let keyCheck = {
            x:i,
            y:j
          }
          console.log(maps.get(keyCheck));
        }
      }
    }
  }
}

/**
 * Class representing a worker.
 * @extends Human
 */
class Worker extends Human {
  constructor( humanNumber, workerDirection ,immunity, homeX, homeY, officeNumber, workStatus, infected,  ) {
    super( humanNumber, immunity,    workStatus, infected);
    this.officeNumber = officeNumber;
    this.homeX = homeX;
    this.homeY = homeY;
    this.workerDirection = workerDirection;
  }

  /**
   * Move object one step.
   *
   * @param {number} x the current x value of object.
   * @param {number} y the current y value of object.
   * @param {number} officesArray offices array.
   * @param {Object} maps Humans map.
   */
  moveTowardsDestination( maps, x, y, officesArray) {
    var destinationX, destinationY, officeLocX, officeLocY;
    console.log("moving from x: " + x + " y: " + y+ "  to  "+ this.officeNumber);

    var officeObj  = officesArray[this.officeNumber];
    officeLocX = officeObj.officeX;
    officeLocY = officeObj.officeY;

    //Checks if the object is moving towards office or home

    if(x== officeLocX && y==officeLocY) {
      this.workerDirection = true;
    }
    else if (x== this.homeX && y == this.homeY) {
      this.workerDirection = false;
    }

    let reachedOffice = this.workerDirection;

    //Assign the direction to move towards
    if(reachedOffice) {
        destinationX = this.homeX;
        destinationY = this.homeY;
    }
    else {
       destinationX = officeLocX;
       destinationY = officeLocY;
    }
    console.log("hey");

    console.log(destinationX, destinationY, officeObj.officeNumber);

    //move object towards destination by increment a single value in one step
    let key  = {
      x:x,
      y:y
    }
    var currentX = x;
    var currentY = y;
    let key1 = {
      x: currentX + 1,
      y : currentY
    }
    let key2 = {
      x: currentX ,
      y : currentY + 1
    }
    let key3 = {
      x: currentX - 1,
      y: currentY
    }
    let key4 = {
      x: currentX,
      y: currentY -1
    }
    if(destinationX > currentX) {
      if(!maps.has(key1)) {
        key = key1;
      }
    }
    else if (destinationX < currentX) {
      if(!maps.has(key3)) {

        key = key3;
      }
    }
    else if(destinationY > currentY) {
      if(!maps.has(key2)) {
        key = key2;
      }
    }
    else if (destinationY < currentY) {
      if(!maps.has(key4)) {
        key = key4;
      }
    }
    console.log("moved to x " + key.x + "y " + key.y  + " office reached"+ reachedOffice);

  }

}

/** Class representing a Office. */
class Office {
  constructor(officeNumber, officeX , officeY) {
    this.officeX = officeX;
    this.officeY = officeY;
    this.officeNumber = officeNumber;

  }

}

/** Class representing a Habitat. */
class Habitat {

  /**
   * Creates human objects
   * @return {Object} Map including all human objects created
   */
  generateHumans() {
    var objNumber= 1;
    var map = new Map();
    let key;

    for (let i=0; i<10; i++){ //testing functions for 10 objects
      let objName =  new Human();
       key = {
        x: Math.floor(Math.random()* 1000000),
        y: Math.floor(Math.random()* 1000000)
      }
      if (!map.has(key)) {
        objName.workStatus = Math.random() < 0.3;

        if(objName.workStatus == true) {
          objName = new Worker();
          objName.officeNumber = Math.floor(Math.random()* 10000);;
          objName.humanNumber = objNumber;
          objName.workStatus = true;
          objName.homeX = key.x;
          objName.homeY = key.y;
          objName.workerDirection = false;
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

    return map;
  }

  /**
   * Creates offices array
   * @return {Array} offices array
   */
  createOffices() {

    var Offices = [];
    for (let row=0; row<10000; row++  ) {
      let office =  new Office();
      let x = Math.floor(Math.random()* 1000000);
      let y = Math.floor(Math.random()* 1000000);

      if(Offices.find(Element => Element.x == x && Element.y ==y)) {
        row--;
      }
      else {
        office.officeX =x;
        office.officeY = y;
        office.officeNumber = row;
        Offices.push(office);
      }
    }

    return Offices;
  }
}

var habitat1 = new Habitat();
var maps = habitat1.generateHumans();
var offices = habitat1.createOffices();
console.log(maps);

/**
 * Function called for one tick
 */
function timer(maps, offices) {

  for (let map of maps) {
    let x = map[0].x;
    let y = map[0].y;

    if(map[1].constructor.name == "Worker") {
     map[1].moveTowardsDestination(maps, x, y, offices);
    }

    map[1].checkInfection(x,y, maps);
  }
}

timer(maps, offices);
console.log(maps);















