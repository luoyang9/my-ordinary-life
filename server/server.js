const express = require("express"); 
const morgan = require('morgan');
const path = require("path"); 
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser"); 
const jwt = require('jsonwebtoken');
const compression = require('compression');
const helmet = require('helmet');

const { secret } = require('./config')
const eventApi = require('./api/event');
const userApi = require('./api/user')
const authApi = require('./api/auth');

//express app
const app = express();	
app.use(compression());
app.use(helmet());

app.use(express.static(path.resolve(__dirname + '/../dist/public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());                         // Parses JSON body data
app.use(cookieParser());                            // Parses cookies
app.use(morgan('dev'));

app.use("/api/auth", authApi);
app.use("/api/events", checkUser, eventApi);
app.use("/api/users", checkUser, userApi);

app.get('/', function(req, res) {
    res.sendFile('index.html',  { root: path.resolve(__dirname, "../dist/")});
});

// start app
app.listen(process.env.PORT || 8080, (error) => {
  if (!error && process.env.NODE_ENV !== "production") {
    console.log(`my ordinary life is running on port 8080!`); 
  }
});

function checkUser(req, res, next) {
	const token = req.cookies.token;
	if(token) {
		jwt.verify(token, secret, (err, decoded) => {
			if(err) {
				return res.status(400).json({err: 'Failed to authenticate token'});
			} else {
				req.auth = decoded;
				next();
			}
		})
	} else {
		return res.status(403).send({
			err: "No token provided"
		});
	}
}
