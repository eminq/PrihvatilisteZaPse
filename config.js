require('dotenv').config()

module.exports = {
    db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_SERVER,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      trustServerCertificate: true, 
      trustedConnection: false,
      enableArithAbort: true
    },
    port: 1433},
    auth: {
      jwtSecret: process.env.JWT_SECRET
    }
}
