const express = require('express');

const productController = require('../controllers/productController');

const router = express.Router();


router.get('/productCart', productController.productCart);

router.get('/product-detail', productController.productDetail);

router.get('/new-product', productController.newProduct);

module.exports = router;