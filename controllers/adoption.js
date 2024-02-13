const Adoption = require('../models/adoption');
const adoptionService = require('../services/adoption');
const dogService = require('../services/dog');
const personService = require('../services/person');

module.exports.renderBook = async(req,res) => {
    const adoptions = await adoptionService.getAdoptions();
    const dogs = await dogService.getDogs();
    const people = await personService.getPeople();
    res.render('movements/adoptions/book', { adoptions, dogs, people });
}

module.exports.renderAddForm = async(req,res) => {
    const dogsJson = await dogService.getDogs();
    const adoptableDogs = Object.values(dogsJson).filter(d => d.status === 'In shelter');
    console.log(adoptableDogs);
    const people = await personService.getPeople();
    res.render('movements/adoptions/new', {dogs: adoptableDogs, people});
}

module.exports.addAdoption = async(req,res) => {
    console.log('Received form data:', req.body);
    try{
        let { adoption_date, comment, cost, dogId, personId } = req.body;
        comment = comment === '' ? null : comment;
        cost = cost === '' ? null : parseFloat(cost);
        dogId = parseInt(dogId);
        personId = parseInt(personId);
        const newAdoption = new Adoption(adoption_date, comment, cost, dogId, personId);
        console.log(newAdoption);
        const result = await adoptionService.addAdoption(newAdoption);
        const adoption = result[0];
        if(result){
            dogService.editDogStatus(dogId, 'Adopted');
            res.redirect('/adoptions/book');
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

module.exports.removeAdoption = async(req,res) => {
    try{
        const { id } = req.params;
        console.log(id);
        const adoption = await adoptionService.findAdoption(id);
        console.log(adoption);
        await dogService.editDogStatus(adoption.dogId, 'In shelter');
        await adoptionService.removeAdoption(id);  
        res.redirect('/adoptions/book');
    }catch(err){
        return res.send('Error: ', err);
    }
}