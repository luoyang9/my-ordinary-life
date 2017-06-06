const router = require('express').Router();
const eventsController = require('../controllers').events;

router.post('/', eventsController.create);

router.get('/:userId', eventsController.list);

router.get('/:id', (req, res) => {
  
});

router.delete('/', eventsController.delete);

module.exports = router;