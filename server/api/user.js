const router = require('express').Router();
const userController = require('../controllers').users;
const { hashPassword } = require('../utils');

router.get('/', (req, res) => {
	res.status(200).send({message: "This is the user API"});
});

router.post('/signup', userController.create);

router.post('/login', (req, res) => {
	return userController.getUserAuth(req.body.email).then(auth => {
		const {hashedPassword, salt} = auth;
		const userHashedPassword = hashPassword(req.body.password, salt);
		if(hashedPassword === userHashedPassword) {
			console.log("is success");
			res.send("Login successful!");
		} else {
			res.send("Invalid password");
		}
	});
});

module.exports = router;