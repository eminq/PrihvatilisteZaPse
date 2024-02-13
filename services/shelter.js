const sqlConfig = require('../config');


const addShelter = async (Shelter) => {
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `INSERT INTO Shelter(name,phone,email,address,logo,account_number)
             VALUES ( '${Shelter.name}', '${Shelter.phone}', '${Shelter.email}',
             '${Shelter.address}', '${Shelter.logo}', '${Shelter.account_number} )
             SELECT TOP 1 * FROM Shelter ORDER BY id DESC`
        );
        console.log(result.recordset);
        return result.recordset
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getShelters = async () => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Shelter `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const findShelter = async (shelterId) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Shelter WHERE id = ${shelterId} `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    addShelter,
    getShelters,
    findShelter 

}
