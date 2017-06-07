const User = require('../models').User;
const { randomString, hashPassword } = require('../utils');

module.exports = {
	create(fields) {
		const salt = randomString(12);
		const hashedPassword = hashPassword(fields.password, salt);

		return User.create({
			name: fields.name,
			email: fields.email,
			password: hashedPassword,
			salt: salt
		});
	},

	getUser(email) {
		return User.findOne({
			where: {
				email: email
			}
		});
	}
}