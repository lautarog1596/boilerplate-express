var express = require('express');
var app = express();
require('dotenv').config();
var bGround = require('fcc-express-bground');

// 7) Mount the logger middleware here
app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

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

// 7) Root-level Middleware - A logger. Pleace it before all the routes



 module.exports = app;
