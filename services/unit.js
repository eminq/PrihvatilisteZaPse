const sql = require('mssql');
const config = require('../config');
const sqlConfig = config.db;

const addUnit = async (Unit) => {
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `INSERT INTO Unit( building, number, taken, shelterId )
             VALUES ( '${Unit.building}', ${Unit.number}, ${Unit.taken}, ${Unit.shelterId} )
             SELECT TOP 1 * FROM Unit ORDER BY id DESC`
        );
        console.log(result.recordset);
        return result.recordset
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getUnits = async () => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Unit `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const setUnitStatus = async (unitId, taken) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `UPDATE Unit
             set taken = ${taken}
             where id = ${unitId} `
        );
        return result;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    addUnit,
    getUnits,
    setUnitStatus

}
