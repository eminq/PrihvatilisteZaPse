const sql = require('mssql');
const config = require('../config');
const sqlConfig = config.db;

const addDog = async (Dog) => {
    const birth_date = Dog.birth_date === null ? null : "'" + Dog.birth_date + "'";
    const entry_type = Dog.entry_type == null ? null : "'" + Dog.entry_type + "'";
    console.log(birth_date);
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `INSERT INTO Dog( name,birth_date,age,entry_date,entry_type,status,detailsId,
             behaviourId,unitId,idHealthId,shelterId )
             VALUES ( '${Dog.name}', ${birth_date}, ${Dog.age},
             '${Dog.entry_date}', ${entry_type}, '${Dog.status}', 
             ${Dog.detailsId}, ${Dog.behaviourId}, ${Dog.unitId},
             ${Dog.idHealthId}, ${Dog.shelterId} )
             SELECT TOP 1 * FROM Dog ORDER BY id DESC`
        );
        console.log(result.recordset);
        return result.recordset
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getDogs = async () => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Dog `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const findDog = async (dogId) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Dog WHERE id = ${dogId} `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const editDogStatus = async (dogId, status) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` UPDATE Dog SET status = '${status}' WHERE id = ${dogId} `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    addDog,
    getDogs,
    findDog,
    editDogStatus

}
