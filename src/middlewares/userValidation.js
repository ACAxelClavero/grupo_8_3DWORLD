const { body } = require('express-validator');


const create= [
    body('name').notEmpty().withMessage('Nombre obligatorio')
        .isLength({min: 2}).withMessage('Longitud mínima 2 caracteres'),

    body('lastname').notEmpty().withMessage('Apellido obligatorio')
        .isLength({min: 2}).withMessage('Longitud mínima 2 caracteres'),

    body('email').notEmpty().withMessage('Email obligatorio')
        .isEmail().withMessage('Ingrese un email correcto'),

    body('password').notEmpty().withMessage('Contraseña obligatoria')
        .isLength({min:8}).withMessage('Constraseña minimo 8 caracteres'),

];

const login= [
    body('email').notEmpty().withMessage('Email obligatorio')
        .isEmail().withMessage("Email invalido"),

    body('password').notEmpty().withMessage('Contraseña obligatoria')
        .isLength({min: 8}).withMessage("La constraseña debe tener 8 caracteres como minimo")	
 ];

const edit= [
    body('name').isLength({min: 2}).withMessage('Longitud mínima 2 caracteres'),

    body('lastname').isLength({min: 2}).withMessage('Longitud minima 2 caracteres'),

    body('email').isEmail().withMessage('Ingrese un email correcto'),
    
    body('password').isLength({min:8}).withMessage('Constraseña minimo 8 caracteres')
 ]

const userValidations = {
    create,
    login,
    edit
}
module.exports = userValidations