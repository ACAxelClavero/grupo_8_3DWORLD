const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

//Listado de productos
router.get('/', productController.products); 

//Detalle de un producto particular
router.get('/:id', productController.productDetail); 

//Formulario de creación de productos
router.get('/new-product', productController.newProduct); 

//Acción de creación (a donde se envía el formulario)
router.post('/product', productController.newProductCreation)

//Formulario de edición de productos
router.get('/:id/edit-product', productController.editProduct); 

//Acción de edición (a donde se envía el formulario)
router.put('/:id', productController.editProductId); 

//Acción de borrado
router.delete('/:id', productController.delete);

module.exports = router;