const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const router = express.Router();

const apiProductsEndPoints = require('../apiEndPoints/apiProductsEndPoints');


//lista
router.get('/', apiProductsEndPoints.list);

//detalle producto
router.get('/:id', apiProductsEndPoints.detail)


module.exports = router