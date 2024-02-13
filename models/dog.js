class Dog{
    constructor(name, birth_date=null, age=null, entry_date, entry_type=null, status, detailsId=null, behaviourId=null, unitId, idHealthId=null, shelterId){
        this.name = name;
        this.birth_date = birth_date;
        this.age = age;
        this.entry_date = entry_date;
        this.entry_type = entry_type;
        this.status = status;
        this.detailsId = detailsId;
        this.behaviourId = behaviourId;
        this.unitId = unitId;
        this.idHealthId = idHealthId;
        this.shelterId = shelterId;
    }
} 

module.exports = Dog;