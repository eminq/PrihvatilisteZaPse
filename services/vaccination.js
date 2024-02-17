const sql = require('mssql');
const config = require('../config');
const sqlConfig = config.db;

const addVacc = async (Vacc) => {
    const comment = Vacc.comment === null ? null : "'" + Vacc.comment + "'";
    const performed = Vacc.performed === null ? null : "'" + Vacc.performed + "'";
    const manufacturer = Vacc.manufacturer === null ? null : "'" + Vacc.manufacturer + "'";

    try {
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `INSERT INTO Vaccination( required, performed, cost, vaccionation_type, expire_date, manufacturer, comment, dogId, personId )
             VALUES ( '${Vacc.required}', ${performed}, ${Vacc.cost}, '${Vacc.vaccionation_type}', '${Vacc.expire_date}', 
             ${manufacturer}, ${comment}, ${Vacc.dogId}, ${Vacc.personId} )
             SELECT TOP 1 * FROM Vaccination ORDER BY id DESC`
        ); 
        console.log(result.recordset);
        return result.recordset
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getVaccs = async () => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Vaccination `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const removeVacc = async (vaccId) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` DELETE FROM Vaccionation WHERE id = ${vaccId}`
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    addVacc,
    getVaccs,
    removeVacc
}