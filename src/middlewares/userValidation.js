const { body } = require('express-validator');

const createUserValidation = [
    body('name')
        .notEmpty().withMessage('El campo nombre es requerido!')
        .isLength({ min: 2 }).withMessage('El nombre debe tener mas de dos caracteres'),
    body('lastname')
        .notEmpty().withMessage('El campo apellido es requerido!')
        .isLength({ min: 2 }).withMessage('El apellido debe tener mas de dos caracteres'),
    body('email')
        .isEmail().withMessage("El email debe tener un formato abc@email.com")
        .notEmpty().withMessage('El Campo email es requerido!'),
    body('password')
        .notEmpty().withMessage('El campo contraseña es requerido!')
        .isLength({ min: 2 }).withMessage('La contraseña debe tener mas de dos caracteres'),

        
];

module.exports = {
    createUserValidation
}
