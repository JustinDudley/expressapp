//node app.js    --to spin up
// import { ascEmps } from "./ascEmps";
const express = require("express");
const myOwnApp = express();
const port = 3000;

myOwnApp.get("/", (req, res) => res.send("Check out myOwnApp on node.js!"));
myOwnApp.listen(port, () => console.log(`Yeah, listening on port ${port}`));

//after running npm install body-parser --save,   must still configure it here:
var bodyParser = require("body-parser");
myOwnApp.use(bodyParser.json()); // support json encoded bodies
myOwnApp.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// --  ||   --  ||  --  \\

//Broswer URL, or Postman Get:  http://localhost:3000/someroute
myOwnApp.get("/someroute", helloFunction);
function helloFunction(request, response) {
  response.send(
    "Yes, you've reached this text, within the function called helloFunction"
  );
}

//Browser URL, or Postman Get:  http://localhost:3000/secondroute?namo=Nitsuj
myOwnApp.get("/secondroute", useEquals);
function useEquals(req, res) {
  var namo = req.query.namo;
  res.send("The name you gave in your query was " + namo);
}

//Browser URL, or Postman Get:  http://localhost:3000/welcome/Dudley/Loveland
myOwnApp.get("/welcome/:name/:city", useInternalColon);
function useInternalColon(req, res) {
  var someName = req.params.name;
  var someCity = req.params.city;
  res.send("Welcome, " + someName + " from " + someCity + "!");
}

//Browser URL, or Postman Get:  http://localhost:3000/parity/RUR'
myOwnApp.get("/parity/:alg", calcParity);
function calcParity(req, res) {
  var algo = req.params.alg;
  var noPrime = algo.replace("'", "");
  var evenOrOdd = noPrime.length % 2;
  res.send(
    evenOrOdd === 0 ? "Your algorithm is even" : "Your algorithm is odd"
  );
}

// POST   POST   POST:

// http://localhost:3000/body/
// JSON sent in body:  {"id": "123", "token": "ah76y8", "geo": "America"}
myOwnApp.post("/body", bodyFunction);

function bodyFunction(req, res) {
  var user_id = req.body.id;
  const token = req.body.token;
  let geo = req.body.geo;

  res.send(user_id + ", " + token + ".  geo has " + geo.length + " letters");
}

myOwnApp.post("/bullhorn", bullhornData);
function bullhornData(request, response) {
  const name = request.body.name;
  const age = request.body.age;
  response.send(
    "Your name: Mr. " + name[0] + ".  Your age: " + (age + 100) + "."
  );
}
