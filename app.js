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

const employees = [
  {
    empId: 1,
    name: "Justin",
    address: { street: "502 Park Ave", city: "Lovland" }
  },
  {
    empId: 2,
    name: "Margaret",
    address: { street: "110 Main", city: "Montgomery" }
  },
  {
    empId: 3,
    name: "Max",
    address: { street: "555 Forbes Ave", city: "Pittsburtgh" }
  }
];

myOwnApp.get("/bullhorn/entity/:id", entityData);
function entityData(req, res) {
  var id = Number(req.params.id);
  let okay = "not found";
  var test = false;
  let counter = 0;
  const numbers = employees.map(employee => employee.empId);
  for (const employee of employees) {
    if (employee.empId == id) {
      test = true;
    }
    counter += 19;
    // if (employee.empId == id) {
    // break;
    // }
  }
  res.send(test);
}
// if (numbers.includes(id)) {
//   okay = "found";
// }
// // res.send(okay);
// res.send(okay);

// res.send(names);

// if (employees[2].empId == id) {
//   res.send(employees[2]);
// } else {
//   res.send(id + 10);
// }
// res.send(employees[0].name);

// GET https://rest.bullhornstaffing.com/rest-services/{corpToken}/entity/Candidate/{id}?BhRestToken={session_key}&fields=firstName,lastName,address
