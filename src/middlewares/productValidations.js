const { body } = require('express-validator');


const create= [
    body('name').notEmpty().withMessage('Nombre obligatorio')
        .isLength({min: 2}).withMessage('Longitud mínima 2 caracteres'),

    body('Price').notEmpty().withMessage('El precio es obligatorio')
        .isNumeric().withMessage('Ingrese un numero'),

    body('Date'),

    body("Photo"),

    body("Material").notEmpty().withMessage('Por favor elija un material'),

    body("Size").notEmpty().withMessage('Por favor elija un tamaño'),

];


const edit= [
    body('name').isLength({min: 2}).withMessage('Longitud mínima 2 caracteres'),

    body('Price').isNumeric().withMessage('Ingrese un numero'),

];

const productValidations = {
    create,
    edit
};
module.exports = productValidations;