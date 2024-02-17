const express = require('express');
const router = express.Router();

const adoption = require('../controllers/adoption');
const { checkAuthenticated } = require('../passportConfig');

// ADOPTIONS BOOK
router.get('/book', checkAuthenticated, adoption.renderBook)
// ADD ADOPTION FORM
router.get('/new', checkAuthenticated, adoption.renderAddForm)
// ADD ADOPTION 
router.post('/add', checkAuthenticated, adoption.addAdoption);
// REMOVE ADOPTION
router.get('/remove/:id', checkAuthenticated, adoption.removeAdoption);


module.exports = router;
