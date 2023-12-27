const request = require("supertest");
const assert = require("assert");
const express = require("express");
const PORT = 8000;

const app = express();
let requestCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable

function countRequestOfAUser(req, res, next) {
  requestCount++;
  console.log(requestCount);
  next();
}

app.use(countRequestOfAUser)

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

app.get("/requestCount", function (req, res) {
  res.status(200).json({ requestCount });
});


app.listen(PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
})

module.exports = app;
