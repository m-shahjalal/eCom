const product = require('../controller/product');
const upload = require('../lib/multer');
const router = require('express').Router();

router.get('/', product.getProducts);
router.post('/', upload.single('image'), product.addProduct);
router.get('/popular', product.popular);
router.get('/:id', product.getSingleProduct);

module.exports = router;
