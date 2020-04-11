/* eslint-disable no-console */
var express = require("express");
var router = express.Router();
//En la carpeta anterior es que se encuentra el archivo
const MongoUtils = require("../db/MongoUtils.js");

const mu = MongoUtils();

// Data endpoint: retorna un archivo json
router.get("/getRestaurants", function (req, res) {
  console.log("Backend!!");
  //Client side rendering
  mu.connect()
    .then(mu.getRestaurants)
    //for Front side rendering send the html instead of the json file
    .then((restaurants) => res.json(restaurants))
    .catch((err) => console.log(err));
});

router.get("/details/:id", (req, res) => {
  console.log("Llegue a los detalles");
  const id = req.params.id;
  console.log("identificador", req.params.id);
  mu.connect()
    .then((client) => mu.getRestaurant(client, id))
    .then((restaurant) => {
      res.send(`
        ${restaurant.map((g) => details.buildFile(g))}`);
    })
    .catch((err) => console.log(err));
});

router.get("/usuarios/:id", (req, res) => {
  console.log("Llegue a los usuarios");
  const id = req.params.id;
  console.log("identificador", req.params.id);
  mu.connect()
    .then((client) => mu.getUser(client, id))
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});
router.get("/getUsers", function (req, res) {
  console.log("Backend!!");
  //Client side rendering
  mu.connect()
    .then((client) => mu.getUsers(client, (users) => res.json(users), true))
    //for Front side rendering send the html instead of the json file
    .catch((err) => console.log(err));
});
router.post("/user", function (req, res) {
  console.log("Backend!!");
  console.log("Llego post user al index!!");

  let body = req.body;
  //Client side rendering
  mu.connect()
    .then((client) => mu.addUser(client, body, (user) => res.json(user)))
    //for Front side rendering send the html instead of the json file
    .catch((err) => console.log(err));
});

router.post("/restaurant", function (req, res) {
  console.log("Backend!!");
  console.log("Llego post al index!!");

  let body = req.body;
  //Client side rendering
  mu.connect()
    .then((client) =>
      mu.addRestaurant(client, body, (restaurant) => res.json(restaurant))
    )
    //for Front side rendering send the html instead of the json file
    .catch((err) => console.log(err));
});
router.put("/restaurant/:id", function (req, res) {
  var body = req.body;
  let id = req.param.id;
  mu.connect()
    .then((client) =>
      mu.updateRestaurant(client, body, id, (restaurant) =>
        res.json(restaurant)
      )
    )
    .catch((err) => console.log(err));
});
module.exports = router;
