const Dog = require('../models/dog');
const dogService = require('../services/dog');
const unitService = require('../services/unit');
const valuesConfig = require('../valuesConfig');

module.exports.renderOverview = async(req,res) => {
    console.log('User:', req.user);
    const dogs = await dogService.getDogs();
    res.render('dogs/overview', { dogs });
}

module.exports.renderAddForm = async(req,res) => {
    const unitsJson = await unitService.getUnits();
    const units = Object.values(unitsJson);
    console.log(units);
    const freeUnits = units.filter(u => u.taken === false);
    console.log('free: ', freeUnits);
    res.render('dogs/new', { entryTypes : valuesConfig.entry_type, units : freeUnits }); 
}

module.exports.renderProfile = async(req,res) => {
    const { id } = req.params;
    const dogs = await dogService.findDog(id); 
    console.log('Dog profile', dogs[0]);
    res.render('dogs/profile', { dog : dogs[0] });
}

module.exports.getDogs = async(req,res) => {
    const dogs = await dogService.getDogs();
    res.send(dogs);
}

module.exports.addDog = async(req,res) => {
    console.log('Received form data:', req.body);
    try{
        let { name, birth_date, age, entry_date, entry_type, unitId, shelterId } = req.body;
        birth_date = birth_date === '' ? null : birth_date;
        age = age === '' ? null : parseFloat(age);
        const newDog = new Dog(name, birth_date, age, entry_date, entry_type, status='In shelter', 
            detailsId=null, behaviourId=null, unitId, idHealthId=null, shelterId);
        const result = await dogService.addDog(newDog);
        const dog = result[0];
        if(result){
            await unitService.setUnitStatus(unitId, 1);
            res.redirect(`/dogs/${dog.id}`);
            // return res.json({
            //     response: true,
            //     dog: dog
            // });
        }else{
            return res.json({
                response: false,
                message: 'Error!'
            });
        }
    }catch(err){
        return res.json({
            response: false,
            message: 'Error!'
        });
    }
} 