const express = require('express');

const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.index);

router.get('/productCart', mainController.productCart);

router.get('/product-detail', mainController.productDetail);

router.get('/new-product', mainController.newProduct);

module.exports = router;