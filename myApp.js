var express = require('express');
var app = express();
require('dotenv').config();
var bGround = require('fcc-express-bground');
var bodyParser = require('body-parser');

// 7) Root-level Middleware - A logger. Pleace it before all the routes
// 7) Mount the logger middleware here
app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// 11) Mount the body-parser middleware here
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// 1) Meet the node console
console.log('Hello World');
bGround.log('Hello World');

// 2) A first work Express Server
// app.get("/", function(req, res){
//   res.send("Hello Express");
// })

// 3) Serve an HTML file
app.get("/", function(req, res){
  let path = __dirname + "/views/index.html";
  res.sendFile(path);
})

// 4) Serve a static asset
app.use("/public", express.static(__dirname + "/public"));

// 5) serve JSON on a specific route
/* app.get("/json", function(req, res){
  res.json({
    "message": "Hello json"
  });
}); */

// 6) Use the .env file to configure the app
app.get("/json", function(req, res){
  let jsonResponse = { "message": "Hello json" };
  if(process.env.MESSAGE_STYLE === "uppercase"){
    jsonResponse.message = jsonResponse.message.toUpperCase();
  }
  res.json(jsonResponse);
});

// 8) Chaining middleware. A Time server
app.get("/now", function(req, res, next){
  req.time = new Date().toString();
  next();
  }, function(req, res){
    res.json({ time: req.time });
  }
);

// 9) Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
})

// 9) Get Query Parameter Input from the Client
app.get("/name", (req, res) => {
  res.json({ name: req.query.first + " " + req.query.last });
})


 module.exports = app;
