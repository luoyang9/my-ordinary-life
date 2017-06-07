const router = require('express').Router();
const eventsController = require('../controllers').events;

router.post('/', eventsController.createOrUpdate);

router.get('/', eventsController.list);

router.get('/:year/:month/:day', eventsController.getByDate);

router.delete('/', eventsController.delete);

module.exports = router;