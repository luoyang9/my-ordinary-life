const Event = require('../models').Event;

module.exports = {
	create(req, res) {
		return Event.create({
			title: req.body.title,
			userId: req.auth.userId
		})
		.then(event => res.status(201).send(event))
		.catch(err => res.status(400).send(err));
	},

	delete(req, res) {
		return Event.destroy({
			where: {
				id: req.body.id,
				userId: req.auth.userId
			}
		})
		.then(event => res.status(204))
		.catch(err => res.status(400).send(err));
	},

	list(req, res) {
		return Event.findAll({
			where: {
				userId: req.auth.userId
			}
		})
		.then(events => res.status(200).send(events))
		.catch(err => res.status(400).json({err: err}));
	}
}