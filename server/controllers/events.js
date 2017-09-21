const Event = require('../models').Event;

module.exports = {
	createOrUpdate(req, res) {
		Event.findOne({
			where: {
				publishDate: {
					$eq: req.body.publishDate
				},
				userId: req.auth.userId
			}
		}).then(event => {
			if(!event) {
				console.log("create today's event");
				return Event.create({
					title: req.body.title,
					content: req.body.content,
					publishDate: req.body.publishDate,
					userId: req.auth.userId
				})
				.then(event => res.status(201).json(event))
				.catch(err => res.status(400).json({err: err}));
			} else {
				console.log("update event");
				return Event.update({
					title: req.body.title,
					content: req.body.content
				}, {
					where: {
						id: event.id,
						userId: req.auth.userId
					}
				})
				.then(event => res.status(200).json(event))
				.catch(err => res.status(400).json({err: err}));
			}
		}).catch(err => res.status(400).json({err: err}));
		
	},

	delete(req, res) {
		return Event.destroy({
			where: {
				id: req.body.id,
				userId: req.auth.userId
			}
		})
		.then(event => res.status(204))
		.catch(err => res.status(400).json({err: err}));
	},

	getByDate(req, res) {
		return Event.findOne({
			where: {
				publishDate: req.params.year + "/" + req.params.month + "/" + req.params.day,
				userId: req.auth.userId
			}
		})
		.then(event => res.status(200).json(event))
		.catch(err => res.status(400).json({err: err}));
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