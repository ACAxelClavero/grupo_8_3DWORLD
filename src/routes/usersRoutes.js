const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');

const { createUserValidation } = require('../middlewares/userValidation');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const isLogged = require ('../middlewares/userValidation')
const usersController = require('../controllers/usersController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/users'));
    },
    filename: (req, file, cb) => {
        let imageName = 'user' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
})

const upload = multer({ storage });

const validateRegisterForm = [
    body('name').notEmpty().withMessage('Nombre obligatorio'),
    body('name').isLength({min: 2}).withMessage('Longitud mínima 2 caracteres'),
    body('email').notEmpty().withMessage('Email obligatorio'),
    body('email').isEmail().withMessage('Ingrese un email correcto'),
    body('password').notEmpty().withMessage('Contraseña obligatoria'),
   body('password').isLength({min:8}).withMessage('Constraseña minimo 8 caracteres'),

]
const validacionesLogin = [
    body('email').notEmpty().withMessage('Email obligatorio'),
    body("email").isEmail().withMessage("Email invalido"),
    body('password').notEmpty().withMessage('Contraseña obligatoria'),
    body("password").isLength({min: 8}).withMessage("La constraseña debe tener 8 caracteres como minimo")	
 ]
 


/* Obtener usuarios */
//router.get('/', usersController.index);

/* Obtener un usuario especifico */
router.get('/profile/:id', authMiddleware, usersController.profile);

/* Crear usuario */
router.get('/register', usersController.register);
router.post('/register', upload.single('avatar'), createUserValidation, usersController.newUser);

/* Editar usuario */
router.get('/edit/:id', authMiddleware, usersController.edit);
router.put('/:id', upload.single('avatar'), usersController.update);

/* Eliminar usuario */
router.delete('/:id', authMiddleware, usersController.delete);

/* Formulario login */
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess)

/* Cerrar Sesioin*/
router.get('/logout', usersController.logout);


module.exports = router; 
