const express = require('express');
const router = express.Router();

const person = require('../controllers/person');

// OVERVIEW
router.get('/', person.renderOverview)
// ADD A person FORM
router.get('/new', person.renderAddForm)
// ADD A person FORM
router.get('/all', person.getPeople)
// ADD A person
router.post('/add', person.addPerson);



module.exports = router;
