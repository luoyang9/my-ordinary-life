const express = require("express"); 
const path = require("path"); 
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser"); 

const mysql = require('./database/mysql.js');

//database instance

//express app
const app = express();

app.use(express.static(path.resolve(__dirname + '/../dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());                         // Parses JSON body data
app.use(cookieParser());                            // Parses cookies

app.use("/api/event", require("./api/event")(mysql));
app.use("/api/user", require("./api/user")(mysql));

app.get('/', function(req, res) {
    res.sendFile('index.html',  { root: "dist/"});
});

// start app
app.listen(8080, (error) => {
  if (!error) {
    console.log(`Timeline is running on port 8080!`); 
  }
});
