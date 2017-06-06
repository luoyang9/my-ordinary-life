const Event = require('../models').Event;

module.exports = {
	create(req, res) {
		return Event.create({
			title: req.body.title,
			userId: req.body.userId
		})
		.then(event => res.status(201).send(event))
		.catch(err => res.status(400).send(err));
	},

	delete(req, res) {
		return Event.destroy({
			where: {
				id: req.body.id
			}
		})
		.then(event => res.status(204))
		.catch(err => res.status(400).send(err));
	},

	list(req, res) {
		return Event.findAll({
			where: {
				userId: req.params.userId
			}
		})
		.then(events => res.status(200).send(events))
		.catch(err => res.status(400).send(err));
	}
}