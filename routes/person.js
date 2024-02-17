const express = require('express');
const router = express.Router();

const person = require('../controllers/person');
const { checkAuthenticated } = require('../passportConfig');

// OVERVIEW
router.get('/', checkAuthenticated, person.renderOverview)
// ADD A person FORM
router.get('/new', checkAuthenticated, person.renderAddForm)
// ADD A person FORM
router.get('/all', checkAuthenticated, person.getPeople)
// ADD A person
router.post('/add', checkAuthenticated, person.addPerson);



module.exports = router;
