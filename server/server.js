const http = require('http');
const express = require("express"); // Handling get/post requests
const path = require("path"); // Joing paths
const bodyParser = require("body-parser"); // Parsing data
const cookieParser = require("cookie-parser"); // Parsing cookies
const mysql = require('./database/mysql.js');
const EventEmitter = require('events');
const config = require("../config"); // Get configuration settings
// const log = require('./lib/logger');

const debug = process.env.NODE_ENV === "development";
const events = new EventEmitter.EventEmitter();

const db = new mysql(config.MySQL);

const app = express();

app.use(express.static(path.resolve(__dirname + '/../dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());                         // Parses JSON body data
app.use(cookieParser());                            // Parses cookies

app.get('/', function(req, res) {
    res.sendFile('index.html',  { root: "dist/"});
});

// start app
app.listen(config.http.port, (error) => {
  if (!error) {
    console.log(`Timeline is running on port: ${config.http.port}!`); 
  }
});
