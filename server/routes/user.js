const express = require('express');
const users = require('../controller/user');
const loginValidator = require('../validator/login');
const signupValidator = require('../validator/signup');

const router = express.Router();

/* GET users listing. */
router.get('/', users.getAllUsers);
router.post('/register', signupValidator, users.createUser);
router.post('/login', loginValidator, users.login);
router.get('/check/:jwt', users.checkLogin);

module.exports = router;
