const router = require('express').Router();

router.get('/', (req, res) => {
	res.json({
		message: 'Hello world!',
	});
});

router.get('/protected', (req, res) => {
	res.json({ message: 'This is protected route' });
});

module.exports = router;
