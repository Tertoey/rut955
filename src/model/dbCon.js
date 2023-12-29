const mysql = require('mysql2')

const dbCon = mysql.createConnection({
    host        :   'localhost',
    user        :   'root',
    password    :   'P@ssw0rd',
    database    :   "warehouse"
})

dbCon.connect(err=>{
    if ( err ) throw new Error(`Error connecting to the DB ${err}`)
    console.log(`Database Conneted`)
})

module.exports = dbCon