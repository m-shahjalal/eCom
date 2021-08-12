const express = require('express');
const users = require('../controller/user');
const upload = require('../lib/multer');
const authCheck = require('../middleware/authCheck');
const loginValidator = require('../validator/login');
const signupValidator = require('../validator/signup');

const router = express.Router();

/* GET users listing. */
router.get('/', users.getAllUsers);
router.post('/register', signupValidator, users.createUser);
router.get('/check/:jwt', users.checkLogin);
router.post('/login', loginValidator, users.login);
router.get('/:id', authCheck, users.getUserDetails);
router.post('/:id/update', authCheck, upload.single('avatar'), users.editUser);

module.exports = router;
