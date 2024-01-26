const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');

const userValidation= require('../middlewares/userValidation');
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

 
/* Obtener usuarios */
//router.get('/', usersController.index);

/* Obtener un usuario especifico */
router.get('/profile/:id', authMiddleware, usersController.profile);

/* Crear usuario */
router.get('/register', usersController.register);
router.post('/register', upload.single('avatar'), userValidation.create, usersController.newUser);

/* Editar usuario */
router.get('/edit/:id', authMiddleware, usersController.edit);
router.put('/:id', upload.single('avatar'), userValidation.edit, usersController.update);

/* Eliminar usuario */
router.delete('/:id', authMiddleware, usersController.delete);

/* Formulario login */
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', userValidation.login, usersController.loginProcess)

/* Cerrar Sesioin*/
router.get('/logout', authMiddleware, usersController.logout);


module.exports = router; 
