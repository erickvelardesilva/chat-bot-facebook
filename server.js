const express = require("express");

const morgan = require("morgan");

const bodyParser = require("body-parser");

const app = express(); // app configuration
app.use(morgan("dev"));

// app.set("port", process.env.PORT || 3000); // setup our express applicationapp.use(morgan('dev')); // log every request to the console.

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); // app routes

// require("./webhook_verify")(app); // warming up the engines !! setta !! go !!!.app.listen(app.get('port'), function() {
//
const port = "8585";
const r = require("./webhook_verify");
app.use(r);

app.listen(port, function () {
  const url = "http://localhost:" + port;
  console.log("Application running on port: ", url);
});
