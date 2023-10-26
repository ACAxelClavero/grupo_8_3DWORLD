const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

//Listado de productos
router.get('/productCart', productController.productCart); 

//Detalle de un producto particular
router.get('/product/:id', productController.productDetail); 

//Formulario de creación de productos
router.get('/new-product', productController.newProduct); 

//Acción de creación (a donde se envía el formulario)
router.post('/products', productController.newProductCreation)

//Formulario de edición de productos
router.get('/products/:id/edit', productController.editProduct); 

//Acción de edición (a donde se envía el formulario)
router.put('/products/:id', productController.editProductId); 

//Acción de borrado
router.delete('/delete/:id', productController.delete);

module.exports = router;