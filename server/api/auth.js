const router = require('express').Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers').users;
const { hashPassword } = require('../utils');
const { secret } = require('../config.js');

router.post('/signup', (req, res) => {
	userController.getUser(req.body.email).then(user => {
		if(!user) {
			return userController.create({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});
		} else {
			return Promise.reject(new Error('email-exists'));
		}
	}).then(user => {
		const userObj = {
			userId: user.id,
			email: user.email,
			name: user.name
		}
		const token = jwt.sign(userObj, secret, {
          expiresIn: "1d" // expires in 24 hours
        });
		res.status(201)
			.cookie('token', token, { expires: new Date(Date.now() + 86400000) })
			.json({
				token: token
			});
	}, error => {
		res.status(400).json({err: "The email address is already linked to an account."});
	}).catch(err => {
		console.error(err);
		res.status(400).json({err: "An unexpected error occurred."}) 
	});
});

router.post('/login', (req, res) => {
	return userController.getUser(req.body.email)
		.then(user => {
			if(!user) {
				return res.status(400).json({err: "Invalid username or password."});
			}
			const {password, salt} = user;
			const userHashedPassword = hashPassword(req.body.password, salt);
			if(password === userHashedPassword) {
				const userObj = {
					userId: user.id,
					email: user.email,
					name: user.name
				}
				const token = jwt.sign(userObj, secret, {
		          expiresIn: "1d" // expires in 24 hours
		        });
				res.status(200)
					.cookie('token', token, { expires: new Date(Date.now() + 86400000) })
					.json({
						token: token
					});
			} else {
				res.status(400).json({
					err: "Invalid username or password."
				});
			}
		})
		.catch(err => {
			console.error(err);
			res.status(400).json({err: "An unexpected error occurred"});
		});
});

module.exports = router;