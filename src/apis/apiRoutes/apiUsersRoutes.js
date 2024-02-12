const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const router = express.Router();

const apiUsersEndPoints = require('../apiEndPoints/apiUsersEndPoints');


//lista
router.get('/', apiUsersEndPoints.list);

//detalle usuario
router.get('/:id', apiUsersEndPoints.detail)



module.exports = router