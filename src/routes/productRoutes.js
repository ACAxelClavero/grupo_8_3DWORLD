const express = require('express');
const path = require('path');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const productValidator = require('../middlewares/productValidations')
const {body} = require('express-validator')
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req, file, cb) =>  {
        cb(null,path.join(__dirname,  '../public/images/productos'));
    },
    filename : (req, file, cb) => {
        let imageName = 'pitch-' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});

const upload = multer({ storage }).array('imagenesProducts');;



// Obtener listado de productos
router.get('/', productController.products); 

//Carrito
router.get('/productCart', productController.productCart)

//Detalle de un producto particular
router.get('/:id', productController.productDetail); 

/*** Crear un nuevo producto ***/
//Formulario de creación de productos
router.get('/new-product', productController.newProductForm); 

//Acción de creación (a donde se envía el formulario)
router.post('/create', authMiddleware, upload,  productValidator.create, productController.newProductCreation)

/*** Editar un producto ***/
//Formulario de edición de productos
router.get('/:id/edit-product', authMiddleware, productController.editProductForm); 

//Acción de edición (a donde se envía el formulario)
router.put('/:id', authMiddleware, upload, productValidator.edit, productController.editProductId); 

//Acción de borrado
router.delete('/:id', authMiddleware, productController.delete);


module.exports = router;


