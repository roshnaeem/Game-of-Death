"use strict";

/** Class representing a Human. */
class Human {
  constructor(humanNumber, immunity, infectedDuration,  workStatus, infected) {
    this.immunity = immunity;
    this.humanNumber = humanNumber;
    this.workStatus = workStatus;
    this.infected =infected;
    this.infectedDuration = infectedDuration;
  }

  /**
   * Check infection status in contact 3 by 3.
   *
   * @param {number} x the current x value of object.
   * @param {number} y the current y value of object.
   * @param {Object} maps Humans map.
   * @param {t} number recovery time
   */
  checkInfection(x,y,maps,t) {
    let n = 4;
    if(this.infected) {
      this.infectedDuration++;
    }

   if(this.immunity < 0.5) {
      for(let i=x-1; i<=x+1; i++) {
        for(let j=y-1; j<=y+1; j++) {
          if(i>=0 && i<= n && j>=0 && j<=n && i!=x && j!=y) {
            let keyCheck = i.toString() + " " + j.toString();

            if(maps.has(keyCheck)) {
              let neighbour = maps.get(keyCheck);
              if(neighbour.infected) {

                this.infectedDuration = 0; //if an already infected person comes again in contact with infected person, his ocunter reset to zero.
                this.infected = true;
              }
            }
          }
        }
      }
    }

    if (this.infectedDuration == t) {
      this.infected = false;
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
   * @param {Object} maps Humans map.
   * @param {number} currentX the current x value of object.
   * @param {number} currentY the current y value of object.
   * @param {number} officesArray offices array.
   * @param {n} number grid size
   */
  moveTowardsDestination( maps, currentX, currentY, officesArray, n, tempMaps) {
    var destinationX, destinationY, officeLocX, officeLocY;
    var officeObj  = officesArray[this.officeNumber];
    officeLocX = officeObj.officeX;
    officeLocY = officeObj.officeY;

     //Checks if the object is moving towards office or home
    if(currentX == officeLocX && currentX==officeLocY) {
      this.workerDirection = true;
    }
    else if (currentX== this.homeX && currentX == this.homeY) {
      this.workerDirection = false;
    }

    let reachedOffice = this.workerDirection;
    let keyTempObject;

    //Assign the direction to move towards
    if(reachedOffice) {
        destinationX = this.homeX;
        destinationY = this.homeY;
    }
    else {
       destinationX = officeLocX;
       destinationY = officeLocY;
    }

    //console.log(destinationX, destinationY, officeObj.officeNumber);

    if(destinationX == currentX && destinationY > currentY && (currentY + 1) <= n) {
      keyTempObject = currentX.toString() +  " " +(currentY + 1).toString();
      if(!maps.has(keyTempObject)) {
        tempMaps.set(keyTempObject, this);
      }
    }

    else if(destinationX == currentX && destinationY < currentY && (currentY - 1) >= 0 ) {
      keyTempObject = currentX.toString() +  " " + (currentY - 1).toString();
      if(!maps.has(keyTempObject)) {
        tempMaps.set(keyTempObject, this);
      }
    }

    else if(destinationY == currentY && destinationX > currentX && (currentX + 1) <= n) {
      keyTempObject = (currentX + 1).toString() +  " " + currentY.toString();
      if(!maps.has(keyTempObject)) {
        tempMaps.set(keyTempObject, this);
      }
    }

    else if(destinationY == currentY && destinationX < currentX && (currentX - 1) >= 0) {
      keyTempObject = (currentX - 1).toString() +  " " + currentY.toString();
      if(!maps.has(keyTempObject)) {
        tempMaps.set(keyTempObject, this);
      }
    }

    else if(destinationX > currentX && destinationY > currentY && (currentX + 1) <= n) {
      keyTempObject = (currentX + 1).toString() +  " " + currentY.toString();
      if(!maps.has(keyTempObject)) {
        tempMaps.set(keyTempObject, this);
      }
      else if( (currentY + 1) <= n) {
        keyTempObject = currentX.toString() +  " " + (currentY + 1).toString();
        if(!maps.has(keyTempObject)) {
          tempMaps.set(keyTempObject, this);
        }
      }
    }

    else if(destinationX > currentX && destinationY < currentY && (currentX + 1) <= n) {
      keyTempObject = (currentX + 1).toString() +  " " + currentY.toString();
      if(!maps.has(keyTempObject)) {
        tempMaps.set(keyTempObject, this);
      }
      else if( (currentY - 1) >= 0) {
        keyTempObject = currentX.toString() +  " " + (currentY - 1).toString();
        if(!maps.has(keyTempObject)) {
          tempMaps.set(keyTempObject, this);
        }
      }
    }

    else if(destinationX < currentX && destinationY > currentY && (currentX - 1) >= 0) {
      keyTempObject = (currentX - 1).toString() +  " " + currentY.toString();
      if(!maps.has(keyTempObject)) {
        tempMaps.set(keyTempObject, this);
      }
      else if( (currentY + 1) <= n) {
        keyTempObject = currentX.toString() +  " " + (currentY + 1).toString();
        if(!maps.has(keyTempObject)) {
          tempMaps.set(keyTempObject, this);
        }
      }
    }

    else if(destinationX < currentX && destinationY < currentY && (currentX - 1) >= 0) {
      keyTempObject = (currentX - 1).toString() +  " " + currentY.toString();
      if(!maps.has(keyTempObject)) {
        tempMaps.set(keyTempObject, this);
      }
      else if( (currentY - 1) >= 0) {
        keyTempObject = currentX.toString() +  " " + (currentY - 1).toString();
        if(!maps.has(keyTempObject)) {
          tempMaps.set(keyTempObject, this);
        }
      }
    }
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
   * @param {number} h of human objects to generate
   * @param {number} n grid szie n by n
   * @return {Object} Map including all human objects created
   */
  generateHumans(n, h) {
    var objNumber= 1;
    var map = new Map();
    let key,x,y;

    for (let i=0; i<h; i++){
      let objName =  new Human();
      x = Math.floor(Math.random()* n);
      y = Math.floor(Math.random()* n);
      key = x.toString() +  " " + y.toString(); //changed key type from object to string

      if (!map.has(key)) {
        objName.workStatus = Math.random() < 0.3;

        if(objName.workStatus == true) { //create a worker object
          objName = new Worker();
          objName.officeNumber = Math.floor(Math.random()* 10000);;
          objName.humanNumber = objNumber;
          objName.workStatus = true;
          objName.homeX = parseInt(key.split(' ')[0]);
          objName.homeY = parseInt(key.split(' ')[1]);
          objName.workerDirection = false;
          objName.infectedDuration = 0;
          objName.infected = Math.random() < 0.3;
          objName.immunity = Math.random().toFixed(2);
        }
        else { //create a human object
          objName.immunity = Math.random().toFixed(2);
          objName.humanNumber = objNumber;
          objName.infectedDuration = 0;
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

let n = 1000000;
let h = 1000000;
var habitat1 = new Habitat();
var maps = habitat1.generateHumans(n, h);
var offices = habitat1.createOffices();
console.log(maps);

/**
 * Function called for one tick
 */
function timer(maps, offices) {

  var x,y,key,t;
  t=14;
  var tempMaps = new Map();

  for (let map of maps) {
    key = map[0];
    x = parseInt(key.split(' ')[0]);
    y = parseInt(key.split(' ')[1]);
    map[1].checkInfection(x,y, maps, t);

    if(map[1].constructor.name == "Worker") {
      map[1].moveTowardsDestination(maps, x, y, offices, n, tempMaps);
    }
  }
  console.log(tempMaps);
}

timer(maps, offices);