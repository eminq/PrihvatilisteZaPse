const express = require('express');
const router = express.Router();

const medical = require('../controllers/medical');
const { checkAuthenticated } = require('../passportConfig');

// VACC BOOK
router.get('/vaccination/book', checkAuthenticated, medical.renderVaccBook)
// ADD ADOPTION FORM
router.get('/vaccination/new', checkAuthenticated, medical.renderAddVaccForm)
// ADD ADOPTION 
router.post('/vaccination/add', checkAuthenticated, medical.addVaccionation);



module.exports = router;
