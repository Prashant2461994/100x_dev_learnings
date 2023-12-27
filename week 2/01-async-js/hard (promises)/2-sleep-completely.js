/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep(seconds) {
  let startTime = Date.now();
  let delay = seconds * 1000;
  let currentTime = delay;

  while (currentTime - startTime < delay) {
    currentTime = Date.now();
  }
}

//console.log("Start ", Date.now());
//sleep(10);
//console.log("End", Date.now());

//1703326190223-1703326193253





  busyWait(3000);
  console.log("waited for 3 seconds");
  busyWait(6000);
  console.log("waited for 6 seconds");
  
