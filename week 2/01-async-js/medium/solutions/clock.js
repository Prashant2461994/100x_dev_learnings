//Can you make it so that it updates every second, and shows time in the following formats -

// - HH:MM::SS (Eg. 13:45:23)

//- HH:MM::SS AM/PM (Eg 01:45:23 PM)

function convertSecondsTohh_mm_ss(seconds) {
  let hh = Math.floor(seconds / 3600);
  let remainingSeconds = seconds % 3600;
  let mm = Math.floor(remainingSeconds / 60);
  let ss = remainingSeconds % 60;
  console.log(`${hh}:${mm}::${ss}`);
}

var seconds = 0;
function timer() {
  seconds++;
  console.clear();
  convertSecondsTohh_mm_ss(seconds);
  setTimeout(timer, 1000);
}

timer();



