const mysql = require('mysql2');
const pool = mysql.createPool({
    host: '172.105.61.121',
    user: 'busproject',
    password:'passwordXYZ',
    database: 'projectbuses',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:0
})

pool.on('connection', function (connection) {
    console.log('DB connection established');
    pool.on('error', function (err) {
        console.log('db error');
    })
    pool.on("close", function (err) {
        console.log('db closed');
    })

})
module.exports=pool