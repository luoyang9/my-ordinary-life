const express = require("express"); 
const morgan = require('morgan');
const path = require("path"); 
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser"); 

const eventApi = require('./api/event');
const userApi = require('./api/user')

//express app
const app = express();

app.use(express.static(path.resolve(__dirname + '/../dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());                         // Parses JSON body data
app.use(cookieParser());                            // Parses cookies
app.use(morgan('dev'));

app.use("/api/events", eventApi);
app.use("/api/users", userApi);

app.get('/', function(req, res) {
    res.sendFile('index.html',  { root: "dist/"});
});

// start app
app.listen(8080, (error) => {
  if (!error) {
    console.log(`Timeline is running on port 8080!`); 
  }
});
