const express = require('express');
const methodOverride = require('method-override');
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



router.use('/:id/edit-product', (req, res, next) => {
    console.log('Middleware de depuración ejecutado para la ruta de edición');
    console.log('Parámetros de la solicitud:', req.params);
    // Puedes imprimir más información sobre la solicitud si es necesario
    next();
  });

/*** Crear un nuevo producto ***/
//Formulario de creación de productos
router.get('/new-product', guestMiddleware , productController.newProductForm); 

//Acción de creación (a donde se envía el formulario)
router.post('/create', guestMiddleware, upload,  productValidator.create, productController.newProductCreation)

/*** Editar un producto ***/
//Formulario de edición de productos
router.get('/:id/edit-product', guestMiddleware, productController.editProductForm);

//Acción de edición (a donde se envía el formulario)
router.put('/:id', guestMiddleware, upload, productValidator.edit, productController.editProductId); 

//Acción de borrado
router.delete('/:id', guestMiddleware, productController.delete);

// Obtener listado de productos
router.get('/', productController.products); 

//Carrito
router.get('/productCart', productController.productCart)

//Detalle de un producto particular
router.get('/:id', productController.productDetail); 
module.exports = router;


