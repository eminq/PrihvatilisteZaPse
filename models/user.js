class User{
    constructor(username, hash, role, personId=null, shelterId){
        this.username = username;
        this.password = hash;
        this.role = role;
        this.personId = personId;
        this.shelterId = shelterId;
    }
} 

module.exports = User;