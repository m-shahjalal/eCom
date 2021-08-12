const product = require('../controller/product');
const upload = require('../lib/multer');
const authCheck = require('../middleware/authCheck');
const router = require('express').Router();

router.get('/', product.getProducts);
router.post('/', upload.single('image'), product.addProduct);
router.get('/popular', product.popular);
router.get('/search', product.getSearchProducts);
router.get('/:id', product.getSingleProduct);
router.get('/category/:category', product.categoryProducts);
router.post('/:id/review', authCheck, product.createProductReview);

module.exports = router;
