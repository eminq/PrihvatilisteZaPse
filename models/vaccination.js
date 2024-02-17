class Vaccination{
    constructor(required, performed=null, cost=null, vaccionation_type, expire_date, manufacturer=null, comment=null, dogId, personId=null){
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
