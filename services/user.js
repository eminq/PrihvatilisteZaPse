const sql = require('mssql');
const config = require('../config');
const sqlConfig = config.db;

const addUser = async (User) => {
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `INSERT INTO "User"(username,password,role,personId,shelterId)
             VALUES ( '${User.username}', '${User.password}', ${User.role},
             ${User.personId}, ${User.shelterId} )
             SELECT TOP 1 * FROM "User" ORDER BY id DESC`
        );
        console.log(result.recordset);
        return result.recordset
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getUsers = async () => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM "User" `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const findUser = async (userId) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM "User" WHERE id = ${userId} `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    addUser,
    getUsers,
    findUser

}
