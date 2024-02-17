const express = require('express');
const router = express.Router();

const dog = require('../controllers/dog');
const { checkAuthenticated } = require('../passportConfig');

// OVERVIEW
router.get('/overview', checkAuthenticated, dog.renderOverview)
// ADD A DOG FORM
router.get('/new', checkAuthenticated, dog.renderAddForm)
// DOG PROFILE
router.get('/:id', checkAuthenticated, dog.renderProfile)
// GET ALL DOGS
router.get('/', dog.getDogs);
// ADD A DOG
router.post('/add', checkAuthenticated, dog.addDog);



module.exports = router;
