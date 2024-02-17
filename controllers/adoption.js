const Adoption = require('../models/adoption');
const adoptionService = require('../services/adoption');
const dogService = require('../services/dog');
const personService = require('../services/person');

module.exports.renderBook = async(req,res) => {
    const allDogs = await dogService.getDogs();
    const dogs = allDogs.filter(d => d.shelterId === req.user.shelterId);
    const dogIds = dogs.map(d => d.id);
    const allAdoptions = await adoptionService.getAdoptions();
    const adoptions = allAdoptions.filter(a => dogIds.includes(a.dogId));
    const people = await personService.getPeople();
    res.render('movements/adoptions/book', { adoptions, dogs, people }); 
}

module.exports.renderAddForm = async(req,res) => {
    const dogsJson = await dogService.getDogs();
    const dogs = Object.values(dogsJson).filter(d => d.shelterId === req.user.shelterId);
    const adoptableDogs = dogs.filter(d => d.status === 'In shelter');
    console.log(adoptableDogs);
    const peopleJson = await personService.getPeople();
    const people = Object.values(peopleJson).filter(p => p.shelterId === req.user.shelterId);
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