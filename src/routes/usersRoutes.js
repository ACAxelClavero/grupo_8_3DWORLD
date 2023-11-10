const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/', usersController.index);

router.get('/profile/:id', usersController.profile);

router.get('/login', usersController.login);

router.route('/register')
  .get(usersController.register)
  .post(usersController.newUser);

router.get('/edit/:id', usersController.edit);
router.put('/:id', usersController.update);

router.delete('/:id', usersController.delete);

router.get('/login', usersController.login);
router.post('/login', usersController.loginProcess);

module.exports = router;