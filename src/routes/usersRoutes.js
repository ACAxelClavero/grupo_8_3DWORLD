const express = require('express');
const path = require('path');

const multer = require('multer');

const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/login', usersController.login);

router.get('/register', usersController.register);

router.post('/register', usersController.newUser);

router.get('/profile', usersController.profile);



module.exports = router; 