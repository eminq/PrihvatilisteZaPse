class Person{
    constructor(first_name, last_name, phone=null, email=null, address=null, birth_date=null, shelterId){
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.birth_date = birth_date;
        this.shelterId = shelterId;
    }
} 

module.exports = Person;

