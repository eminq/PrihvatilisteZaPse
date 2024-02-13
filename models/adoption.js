class Adoption{
    constructor(adoption_date, comment=null, cost=null, dogId, personId){
        this.adoption_date = adoption_date;
        this.comment = comment;
        this.cost = cost;
        this.dogId = dogId;
        this.personId = personId;
    }
} 

module.exports = Adoption;

