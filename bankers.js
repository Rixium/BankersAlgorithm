// Challenge by polypeptide147
//
// Description:
//
// Create a program that will solve the banker’s algorithm.
// This algorithm stops deadlocks from happening by not allowing processes to start
// if they don’t have access to the resources necessary to finish.
// A process is allocated certain resources from the start, and there are other available resources.
// In order for the process to end, it has to have the maximum resources in each slot.
//
// Ex:
// Process 	Allocation 	Max 	Available
// 	A B C 	A B C 	A B C
// P0 	0 1 0 	7 5 3 	3 3 2
// P1 	2 0 0 	3 2 2
// P2 	3 0 2 	9 0 2
// P3 	2 1 1 	2 2 2
// P4 	0 0 2 	4 3 3
//
// Since there is 3, 3, 2 available, P1 or P3 would be able to go first.
// Let’s pick P1 for the example. Next, P1 will release the resources that it held,
// so the next available would be 5, 3, 2.
//
// The Challenge:
//
// Create a program that will read a text file with the banker’s algorithm in it,
// and output the order that the processes should go in. An example of a text file would be like this:
//
//     [3 3 2]
//
//     [0 1 0 7 5 3]
//
//     [2 0 0 3 2 2]
//
//     [3 0 2 9 0 2]
//
//     [2 1 1 2 2 2]
//
//     [0 0 2 4 3 3]
//
// And the program would print out:
//
// P1, P4, P3, P0, P2
//
// Bonus:
//
// Have the program tell you if there is no way to complete the algorithm.

// Starting available resources.
var available;

// To store our process allocation and max, and also a check to see if it has been allocated.
function process(a, m) {
    this.allocation = a;
    this.max = m;
    this.hasAllocated = false;
};

// A list of all the processes.
var processes = [];

// Read the information from a text file.
function inputProcessesFromFile(file) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", file, false);
  httpRequest.onreadystatechange = function ()
  {
      if(httpRequest.readyState === 4)
      {
          if(httpRequest.status === 200 || httpRequest.status == 0)
          {
              var allText = httpRequest.responseText;
          }
      }
 }
  httpRequest.send(null);
  return httpRequest.responseText;
}

// Grabbing the data from the file.
var data = inputProcessesFromFile('http://www.rixium.com/javascript/bankersalgorithm/data.txt');

// Create a list of our processes.
processes = createProcesses(data);

// Finally, allocate the resources.
allocate(processes);

function allocate(proc) {
  // We keep the count of allocatedCount, so we break the loop once it is the same length of the array.
  var allocatedCount = 0;
  // We will try three times, and resetting when required, and breaking if the tries is 3.
  var tries = 0;
  var allocated = [];
  var allIndex = 0;
  // Loop through proc until all are allocated.
  while(allocatedCount < proc.length) {
    allocatedCount = 0;
    for(var i = 0; i < proc.length; i++) {
      var p = proc[i];
      // Check if it has been allocated, and incremement the allocatedCount to break from the while loop.;
      if(p.hasAllocated) {
        allocatedCount++;
        continue;
      }
      // Set the new available to the current available the allocation of the process.
      var newAvailable = available + p.allocation;
      // If our new value is larger than max value of the process, we can set it to allocated, and add it to the array.
      if(newAvailable >= p.max) {
        available = newAvailable;
        allocated[allIndex] = ("p[" + i + "]");
        allIndex++;
        p.hasAllocated = true;
        // Reset the tries to 0, since we have successfull allocated a resource.
        tries = 0;
      }
    }
    tries++;
    // If our tries are more than 3, than we can break the while loop, since unsolvable.
    if(tries > 3) {
      console.log("Impossible to solve.");
      break;
    }
  }

  // We only want to print our list of allocations, if its equal to the length of proc array, or it wasn't completely solved.
  if(allocated.length == proc.length) {
    for(var i = 0; i < allocated.length; i++) {
      console.log(allocated[i]);
    }
  }

}

function createProcesses(data) {
  // We have a list of blocks for each set of data.
  var blocks = [];

  // A string to hold our block numbers.
  var block = "";
  var startedBlock = false;
  var index = 0;
  // Loop for all the data.
  for(var i = 0; i < data.length; i++) {
    if(!startedBlock) {
      // Start the block once we encounted at [.
      if(data[i] == "[") {
        startedBlock = true;
        continue;
      }
    } else {
      // End the block once we find a ], and add the block to the block array,
      // resetting the block, and incrementing the index.
      if(data[i] == "]") {
        startedBlock = false;
        blocks[index] = block;
        index++;
        block = "";
        continue;
      } else {
        // We don't need spaces in our block, so we're just adding the numbers.
        if(data[i] != " ") {
          block += data[i];
          continue;
        }
      }
    }
  }

  // A list of our processes.
  var proc = [];
  var procIndex = 0;

  // Our available is the first set of numbers in the blocks list.
  available = parseInt(blocks[0]);

  // Create a new process for the remaining blocks, and add to the process list.
  for(var i = 1; i < blocks.length; i++) {
    var alloc = "";
    var max = "";
    for(var j = 0; j < blocks[i].length; j++) {
      // Assuming that the block allocation and max both takes half of the block.
      if(j < Math.floor(blocks[i].length / 2)) {
        alloc += blocks[i][j];
      } else {
        max += blocks[i][j];
      }
    }
    // Create the process and incremement.
    var newProcess = new process(parseInt(alloc), parseInt(max));
    proc[procIndex] = newProcess;
    procIndex++;
  }

  return proc;
}
