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

 
/*Perfil de ususario*/
router.get('/profile', guestMiddleware, usersController.profile);

/* Crear usuario */
router.get('/register', authMiddleware, usersController.register);
router.post('/register', authMiddleware, upload.single('avatar'), userValidation.create, usersController.newUser);

/* Editar usuario */
router.get('/edit', guestMiddleware, usersController.edit)
router.put('/edit', upload.single('avatar'), userValidation.edit, usersController.update);

/* Eliminar usuario */
router.delete('/profile', guestMiddleware, usersController.delete);

/* Formulario login */
router.get('/login', authMiddleware, usersController.login);
router.post('/login', userValidation.login, usersController.loginProcess)

/* Cerrar Sesion*/
router.get('/logout', guestMiddleware, usersController.logout);


module.exports = router; 
