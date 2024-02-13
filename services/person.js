const sql = require('mssql');
const config = require('../config');
const sqlConfig = config.db;

const addPerson = async (Person) => {
    const birth_date = Person.birth_date === null ? null : "'" + Person.birth_date + "'";
    const phone = Person.phone === null ? null : "'" + Person.phone + "'";
    const email = Person.email === null ? null : "'" + Person.email + "'";
    const address = Person.address === null ? null : "'" + Person.address + "'";
    console.log(Person);
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `INSERT INTO Person( first_name, last_name, phone, email, address, birth_date, shelterId )
             VALUES ( '${Person.first_name}', '${Person.last_name}', ${phone}, 
             ${email}, ${address}, ${birth_date}, ${Person.shelterId} )
             SELECT TOP 1 * FROM Person ORDER BY id DESC `
        );
        console.log(result.recordset);
        return result.recordset
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getPeople = async () => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Person `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const findPerson = async (personId) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Person WHERE id = ${personId} `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    addPerson,
    getPeople,
    findPerson

}
