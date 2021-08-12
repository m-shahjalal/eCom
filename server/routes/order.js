const router = require('express').Router();
const order = require('../controller/order');
const authCheck = require('../middleware/authCheck');

router.post('/', authCheck, order.payment);
router.get('/', authCheck, order.getOrderList);

module.exports = router;
