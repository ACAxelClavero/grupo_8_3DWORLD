const express = require('express');

const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.index);

 router.get('/productCart', mainController.productCart);

 router.get('/product-detail', mainController.productDetail);

 router.get('/new-product', mainController.newProduct);

 router.get('/nosotros', mainController.nosotros);

 router.get('/plasticos', mainController.plasticos);


module.exports = router;