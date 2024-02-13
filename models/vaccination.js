class Vaccination{
    constructor(required, performed, cost, vaccionation_type, expire_date, manufacturer, comment, dogId, personId){
        this.required = required;
        this.performed = performed;
        this.cost = cost;
        this.vaccionation_type = vaccionation_type;
        this.expire_date = expire_date;
        this.manufacturer = manufacturer;
        this.comment = comment;
        this.dogId = dogId;
        this.personId = personId;
    }
} 

module.exports = Vaccination;
