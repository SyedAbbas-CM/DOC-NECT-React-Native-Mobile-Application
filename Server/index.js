const { json } = require('express');
const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
host: 'localhost',
//not a good idea to login as root user btw
user:'root',
password:'1234',
database: 'db'
});

connection.connect((err)=>{
    if(err){
        console.log('>>>>CRITICAL ERROR<<<<:');
        throw err;
    }
    console.log('connection was successful\n');
})
app.set('json spaces', 2)
app.get('/',(req,res)=>{
    res.send('This is the express server and stuff')
})
app.get('/stuff',(req,res)=>{
    connection.query('SELECT * FROM users',(err,rows)=>{

        if(err){
            console.log('>>>>>ERROR<<<<<');
            throw err;
            
        }
        else{
            console.log('The data from the database is:\n',rows);
            res.status(200).json(rows);
        }
        connection.end();
    });
    
})
app.post('/login',(req,res)=>{
   //console.log(req.body)
    var loginvariables=['username','userpass']
    let string = JSON.stringify(req.body,(key,value)=> !key || loginvariables.indexOf(key) > -1 ? value:undefined)
    var obj = JSON.parse(string);
    console.log(obj.username);
    console.log(obj.userpass);

    connection.query(`INSERT INTO users values("${obj.username}","${obj.userpass}")`,(err)=>{

        if(err){
            console.log('>>>>>ERROR<<<<<');
            throw err;
        }
        else{
            console.log('USER REGISTERD!');
            res.status(200);
        }
        connection.end();
    });

})
app.listen(8090,()=>{
    console.log("Server has started and listening on port 8090\n");
})