//require mongoose module
const mongoose = require("mongoose");

//require chalk module
var chalk = require("chalk");

//require database url from properties file
var dbURL = require("./properties").DB;

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

//export this function by server.js
module.exports = function() {
  mongoose.set("useCreateIndex", true);
  mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on("connected", function() {
    console.log(connected("Mongoose default connection is open to ", dbURL));
  });
  mongoose.connection.on("error", function(err) {
    console.log(
      error("Mongoose default connection has occurred " + err + " error")
    );
  });
  mongoose.connection.on("disconnected", function() {
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on("SIGINT", function() {
    mongoose.connection.close(function() {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
      process.exit(0);
    });
  });
};
// //Set up default mongoose connection
// var mongoDB = "mongodb://127.0.0.1/my_database";
// mongoose.connect(mongoDB, { useNewUrlParser: true });
// //Get the default connection
// var db = mongoose.connection;
// //Bind connection to error event (to get notification of connection errors)
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
