const express = require('express');
const admin = require('../controller/admin');
const upload = require('../lib/multer');
const adminCheck = require('../middleware/adminCheck');
const authCheck = require('../middleware/authCheck');

const router = express.Router();
router.use(authCheck);
router.use(adminCheck);

// users controller
router.get('/', admin.default);
router.get('/users', admin.getUsers);
router.get('/make-admin/:email', admin.makeAdmin);

// products controller
router.get('/products', admin.getProducts);
router.post('/products', upload.single('image'), admin.addProduct);
router.put('/products/:id', upload.single('image'), admin.updateProduct);
router.delete('/products/:id', admin.deleteProduct);

// orders controller
router.get('/orders', admin.getOrders);
router.put('/orders/:id', admin.deliveryOrder);
router.delete('/orders/:id', admin.deleteOrder);

//

module.exports = router;
