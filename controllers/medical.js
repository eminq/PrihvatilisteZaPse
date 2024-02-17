const Vaccination = require('../models/vaccination');
const dogService = require('../services/dog');
const personService = require('../services/person');
const vaccService = require('../services/vaccination');
const valuesConfig = require('../valuesConfig');


module.exports.renderVaccBook = async(req,res) => {
    const dogsJson = await dogService.getDogs();
    const dogs = Object.values(dogsJson).filter(d => d.shelterId === req.user.shelterId);
    const dogIds = dogs.map(d => d.id);
    const vaccsJson = await vaccService.getVaccs();
    let vaccs;
    if(vaccsJson){
        vaccs = Object.values(vaccsJson).filter(v => dogIds.includes(v.dogId));
    }else{
        vaccs = [];
    }
    console.log('Vaccs', vaccs);
    const people = await personService.getPeople();
    res.render('medical/vaccinations/book', { vaccs, dogs, people }); 
}

module.exports.renderAddVaccForm = async(req,res) => {
    const dogsJson = await dogService.getDogs();
    const dogs = Object.values(dogsJson).filter(d => d.shelterId === req.user.shelterId);
    const peopleJson = await personService.getPeople();
    const people = Object.values(peopleJson).filter(p => p.shelterId === req.user.shelterId);
    res.render('medical/vaccinations/new', { dogs, people, vaccType: valuesConfig.vaccination_type });
}

module.exports.addVaccionation = async(req,res) => {
    console.log('Received form data:', req.body);
    try{
        let { required, performed, cost, vaccionation_type, expire_date, manufacturer, comment, dogId, personId } = req.body;
        comment = comment === '' ? null : comment;
        cost = cost === '' ? null : parseFloat(cost);
        performed = performed === '' ? null : performed;
        manufacturer = manufacturer === '' ? null : manufacturer;
        dogId = parseInt(dogId);
        personId = personId === '' ? null : parseInt(personId);
        const newVacc = new Vaccination(required, performed, cost, vaccionation_type, expire_date, manufacturer, comment, dogId, personId);
        console.log(newVacc);
        const result = await vaccService.addVacc(newVacc);
        const vacc = result[0];
        if(result){
            res.redirect('/medical/vaccination/book');
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
