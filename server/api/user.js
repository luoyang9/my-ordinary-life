const router = require('express').Router();

router.get('/', (req, res) => {
	res.status(200).send({message: "This is the user API"});
});


module.exports = router;