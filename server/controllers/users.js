const User = require('../models').User;
const { randomString, hashPassword } = require('../utils');

module.exports = {
	create(req, res) {
		const salt = randomString(12);
		const hashedPassword = hashPassword(req.body.password, salt);

		return User.create({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
			salt: salt
		})
		.then(user => res.status(201).send({id: user.id}))
		.catch(err => res.status(400).send(err));
	},

	getUserAuth(email) {
		return User.find({
			where: {
				email: email
			}
		})
		.then(user => { return {hashedPassword: user.password, salt: user.salt} })
		.catch(err => { return {err: err} });
	}
}