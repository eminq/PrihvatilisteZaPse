const express = require('express');
const router = express.Router();

const adoption = require('../controllers/adoption');

// ADOPTIONS BOOK
router.get('/book', adoption.renderBook)
// ADD ADOPTION FORM
router.get('/new', adoption.renderAddForm)
// ADD ADOPTION 
router.post('/add', adoption.addAdoption);
// REMOVE ADOPTION
router.get('/remove/:id', adoption.removeAdoption);


module.exports = router;
