var p = new Promise(function (resolve) {
  setTimeout(function () {
    resolve("foo");
  }, 10000);
});

function callback() {
  console.log(p);
}

p.then(callback);
console.log("hiii");
console.log(p);

