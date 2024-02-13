const express = require('express');
const router = express.Router();

const unit = require('../controllers/unit');


// GET ALL UNITS
router.get('/', unit.getUnits);
// ADD A UNIT
router.post('/add', unit.addUnit);
// SET STATUS OF A UNIT
router.patch('/', unit.setUnitStatus);


module.exports = router;
