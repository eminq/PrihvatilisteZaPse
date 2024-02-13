const Person = require('../models/person');
const personService = require('../services/person');
const valuesConfig = require('../valuesConfig');

module.exports.renderOverview = async(req,res) => {
    const people = await personService.getPeople();
    res.render('people/overview', { people });
}

module.exports.renderAddForm = async(req,res) => {
    res.render('people/new' ); //{ flags : valuesConfig.flags }
}

module.exports.getPeople = async(req,res) => {
    const people = await personService.getPeople()
    res.send(people);
}

module.exports.addPerson = async(req,res) => {
    console.log('Received form data:', req.body);
    try{
        let { first_name, last_name, phone, email, address, birth_date, shelterId } = req.body;
        phone = phone === '' ? null : phone;
        email = email === '' ? null : email;
        address = address === '' ? null : address;
        birth_date = birth_date === '' ? null : birth_date;
        const newPerson = new Person(first_name, last_name, phone, email, address, birth_date, shelterId);
        const result = await personService.addPerson(newPerson);
        const person = result[0];
        if(result){
            res.redirect('/people');
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