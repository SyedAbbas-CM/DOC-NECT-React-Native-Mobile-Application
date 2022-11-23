const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    //not a good idea to login as root user btw
    user:'root',
    password:'1234',
    database: 'db'
});

db.connect((err)=>{
    if(err){
        console.log('>>>>CRITICAL ERROR<<<<:');
        throw err;
    }
    console.log('connection was successful\n');
});

module.exports = db;