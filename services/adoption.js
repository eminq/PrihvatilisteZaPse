const sql = require('mssql');
const config = require('../config');
const sqlConfig = config.db;

const addAdoption = async (Adoption) => {
    const comment = Adoption.comment === null ? null : "'" + Adoption.comment + "'";

    try {
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `INSERT INTO Adoption( adoption_date, comment, cost, dogId, personId )
             VALUES ( '${Adoption.adoption_date}', ${comment}, ${Adoption.cost},
             ${Adoption.dogId}, ${Adoption.personId} )
             SELECT TOP 1 * FROM Adoption ORDER BY id DESC`
        );
        console.log(result.recordset);
        return result.recordset
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getAdoptions = async () => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Adoption `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const removeAdoption = async (adoptionId) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` DELETE FROM Adoption WHERE id = ${adoptionId}`
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const findAdoption = async (adoptionId) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Adoption WHERE id = ${adoptionId} `
        );
        return result.recordset[0];
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    addAdoption,
    getAdoptions,
    findAdoption,
    removeAdoption
}
