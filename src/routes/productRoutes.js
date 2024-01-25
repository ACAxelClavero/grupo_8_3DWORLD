const express = require('express');
const path = require('path');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req, file, cb) =>  {
        cb(null, path.join(__dirname, '../public/img/pitchs'));
    },
    filename : (req, file, cb) => {
        let imageName = 'pitch-' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});

const upload = multer({ storage });



const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/authMiddleware');


// Obtener listado de productos
router.get('/', productController.products); 

//Carrito
router.get('/productCart', productController.productCart)

//Detalle de un producto particular
router.get('/:id', productController.productDetail); 

/*** Crear un nuevo producto ***/
//Formulario de creación de productos
router.get('/create', authMiddleware, productController.create); 

//Acción de creación (a donde se envía el formulario)
router.post('/', upload.single('img'), productController.newProductCreation)

/*** Editar un producto ***/
//Formulario de edición de productos
router.get('/:id/edit-product', authMiddleware, productController.editProduct); 

//Acción de edición (a donde se envía el formulario)
router.put('/:id', upload.single('img'), productController.editProductId); 

//Acción de borrado
router.delete('/:id', authMiddleware, productController.delete);


module.exports = router;


