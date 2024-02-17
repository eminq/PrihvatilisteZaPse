const express = require('express');
const router = express.Router();

const user = require('../controllers/user');
const passport = require('passport');

//REGISTER
router.post('/register', user.register);
// LOGIN
router.get('/login', user.renderLoginForm);
router.post('/login', passport.authenticate('local', {successRedirect: "/dogs/overview", failureRedirect: "/users/login"}))
// LOGOUT 
router.get('/logout', user.logout);


module.exports = router;
