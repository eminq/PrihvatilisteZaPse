const Unit = require('../models/unit');
const unitService = require('../services/unit');


module.exports.getUnits = async(req,res) => {
    const units = await unitService.getUnits();
    res.send(units);
}

module.exports.addUnit = async(req,res) => {
    try{
        const { building, number, taken, shelterId } = req.body;
        const newUnit = new Unit( building, number, taken, shelterId );
        console.log(newUnit);
        const result = await unitService.addUnit(newUnit);
        const unit = result[0];
        console.log(unit);
        if(result){
            console.log('added');
            return res.json({
                response: true,
                unit: unit
            });
        }else{
            console.log('error');
            return res.json({
                response: false,
                message: 'Error!'
            });
        }
    }catch(err){
        console.log('error');
        return res.json({
            response: false,
            message: 'Error!'
        });
    }
} 

module.exports.setUnitStatus = async(req,res) => {
    try{
        const { unitId, taken } = req.body;
        const result = await unitService.setUnitStatus(unitId, taken);
        console.log(result);
        if(result){
            console.log('updated');
            return res.json({
                response: true,
                message: 'Unit updated!'
            });
        }else{
            console.log('error');
            return res.json({
                response: false,
                message: 'Error!'
            });
        }
    }catch(err){
        console.log('error');
        return res.json({
            response: false,
            message: 'Error!'
        });
    }
} 