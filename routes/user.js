const express = require('express');
const router = express.Router();

const user = require('../controllers/user');

//REGISTER
router.post('/register', user.register);
// LOGIN
router.get('/login', user.renderLoginForm);
router.post('/login', user.login)
// LOGOUT 
router.get('/logout', user.logout);


module.exports = router;
