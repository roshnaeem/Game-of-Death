# Afinti-Assignment-The-Game-of-Death

This assignment is based on the spread of COVID 19 virus among humans depending on their movement and contact with different people. 
I created the Proof of Concept for a simulation framework. This framework is used to model the spread of COVID 19 in a habitat. 
The habitat is of size n*n where 0< n <= 1000,000 and humans can be in range 1 to 1 million.


## Choice of OOP Language
The language I selected for this task is JavaScript.

## How To Run It
* Reference the file inside the HTML document using a script tag.
* Open the console panel to view the output.

## Assumptions

* Immunity is assigned randomly between 0 and 1 inclusive. 
* Office is assigned randomly to worker humans.
* Only Humans with immunity less than 0.5 will get infected.
* If an already infected person comes again in contact with the infected person, his counter of recovery time resets to zero.
* While moving towards destination (Home or Office) if an object can not find it's way towards X direction, it would go one step in y direction.
* If the object can not find it's way in both X and Y direction , it would stay at the same place.

## Thought Process behind the Choices I made
### Offices Array
 I made an array for Offices with the same index as office number. So, when I move object towards its office it just get its office by going to index "office number" in array. 
 There is no need to traverse the array. 
 
 ### Map data structure
 For human objects, I used maps, instead of 2D array, so instead of nested loop. Human Objects would be created in one loop.
 Map elements can also have objects and Strings as their key. 
 It was easy to search objects in the map as it has its builtin methods like map.has() and map.get(). 
 
 ## Approximate Distribution of Time Spent
 
The maximum time I spent on movement function and its testing. Below is the approximation of time i spent on different parts.

* Classes: 2 hours
* Methods: Half a day
* Testing: 3 hours
* Documentation/Commenting : 1/2 hour
* Readme File: 1 Hour

## Solution Design

### Class: Habitat

Consists of method generateHumans() and createOffices(). As the names show, generateHumans() and createOffices() are to create Human Objects (their Homes) and to create Offices for worker humans, respectively.

### Class: Offices
It is used to create Office Objects.

### Class Human
A human is an object of this class and for every human checkInfection() method is called to check if a human has been infected by spread of COVID19 or not.

### Class Worker
It extends Human class and is for worker elements. It consists of method of movement for worker Humans that help them to reach their destination. A worker human moves towards its office and when he reaches office, it starts moving towards home.


 
 
