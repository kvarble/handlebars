// Dependencies
var express = require("express");
var mysql = require("mysql");

// Create express app instance.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "seinfeld"
});

// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Routes
app.get("/cast", (req, res) => {
    connection.query("SELECT * FROM actors;", (err, results)=>{
        var actorHTML = "";
        results.forEach(function(actor){
        // console.log(actor);
         actorHTML += `<p>id: ${actor.id} name: ${actor.name} coolness: ${actor.coolness_points} attitude: ${actor.attitude}`
        })
        res.send(actorHTML)
    })
})


app.get("/coolness", (req, res) => {
    connection.query("SELECT * FROM actors ORDER BY coolness_points DESC;", (err, results)=>{
        var actorHTML = "";
        results.forEach(function(actor){
        // console.log(actor);
         actorHTML += `<p> coolness: ${actor.coolness_points} id: ${actor.id} name: ${actor.name}  attitude: ${actor.attitude}`
        })
        res.send(actorHTML)
    })
})

app.get("/attitude/:att ", (req, res) => {
    connection.query("SELECT * FROM actors WHERE attitude = ?;", [req.params.att], (err, results)=>{
        var actorHTML = "";
        results.forEach(function(actor){
        console.log(actor);
         actorHTML += `<p> attitude: ${actor.attitude} id: ${actor.id} name: ${actor.name} coolness: ${actor.coolness_points} `
        })
        res.send(actorHTML)
    })
})

app.listen(8080, (req, res) => {
    console.log("listening")
})