const { body } = require('express-validator');


const create= [
    body('name').notEmpty().withMessage('Nombre obligatorio')
        .isLength({min: 2}).withMessage('Longitud mínima 2 caracteres'),

    body('lastname').notEmpty().withMessage('Apellido obligatorio')
        .isLength({min: 2}).withMessage('Longitud mínima 2 caracteres'),

    body('email').notEmpty().withMessage('Email es obligatorio')
        .isEmail().withMessage('Ingrese un email correcto'),

    body('password').notEmpty().withMessage('Contraseña obligatoria')
        .isLength({min:8}).withMessage('Constraseña minimo 8 caracteres'),

];

const login= [
    body('email').if(body('email').exists()).notEmpty().withMessage('Email obligatorio')
    .isEmail().withMessage("Email invalido"),


    body('password').if(body('password').exists()).notEmpty().withMessage('Contraseña obligatoria')
        .isLength({ min: 8 }).withMessage("La contraseña debe tener 8 caracteres como mínimo"),	
 ];

const edit= [
    body('name').notEmpty().withMessage('Nombre obligatorio').isLength({min: 2})
        .withMessage('Longitud mínima 2 caracteres'),

    body('lastname').notEmpty().withMessage('Apellido obligatorio')
        .isLength({min: 2}).withMessage('Longitud mínima 2 caracteres'),

    body('email').notEmpty().withMessage('Email obligatorio')
        .isEmail().withMessage('Ingrese un email correcto'),

    body('password').notEmpty().withMessage('Contraseña obligatoria')
        .isLength({min:8}).withMessage('Constraseña minimo 8 caracteres')

 ]

const userValidations = {
    create,
    login,
    edit
}
module.exports = userValidations