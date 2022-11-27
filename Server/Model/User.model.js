const { query, checkSchema, check } = require('express-validator');
const db = require('./../DB');

const User = {};
User.schema = {
        userId: {
            isInt : true,
        },
        userName : {
            isString : true,
            isLength : {
                options : {
                    min : 3
                }
            }
        },
        pass : {
            isString : true,
            isLength : {
                options : {
                    min : 3
                }
            }
        },
        userRole : {
            isString : true,
            isIn :{
                options : [['USER', 'DOCTOR']]
            } 
        },
        firstName : {
            isString : true,
            isLength : {
                options : {
                    min : 3
                }
            }
        },
        lastName : {
            isString : true,
            isLength : {
                options : {
                    min : 3
                }
            }    
        },
        email : {
            isString : true,
            isEmail : true,
        },
        dob : {
            isString : true,
            isDate : true,
        },
        city : {
            isString : true,
        },
        gender : {
            isString : true,
            isIn : {
                options : [['MALE', 'FEMALE', 'OTHER']]
            } 
        },
        about : {
            isString : true,
        },
    };
    
User.createUser = new function(){
    this.params = ["userName", "pass", "userRole", "firstName", "lastName", "email", "dob"];
    
    this.service = (data, results) => {
        console.log('Creating user')
        console.log(data)
        //placeholder ? are injection proof
        const sql = 'INSERT INTO User(userName, pass, userRole, firstName, lastName, email) values(?, ?, ?, ?, ?, ?)';
        db.query(sql, [data.uname,data.pass,data.role,data.fname,data.lname,data.email], (err, data) => {
            if(err){
                console.log(err)
            }else{
                console.log("Successfully Registered user!")
            }
            results(!err? null : err, data);
        });
    };
};

User.getUserByUserName = new function(){

    this.params = ["userName"];
    this.service = (data, results) => {
        console.log(data)
        const sql = `SELECT * FROM User WHERE userName = ?`;
        db.query(sql, [data.uname], (err, data) => {
            if(err){
                console.log(err)
            }
            else{

            }
            
            results(!err? null : err, data);
        });
    };
};

User.getUserByEmail = new function(){

    this.params = ["email"];
    this.service = (data, results) => {
        //console.log(data)
        const sql = `SELECT * FROM User WHERE email = ?`;
        db.query(sql, [data.email], (err, data) => {
            if(err){
                console.log(err)
            }else{

            }
            
            
            results(!err? null : err, data);
           
        });
    };
};

User.getPasswordbyEmail = new function(){

    this.params = ["email"];
    this.service = (data, results) => {
        //console.log(data)
        const sql = `SELECT pass FROM User WHERE email = ?`;
        db.query(sql, [data.email], (err, data) => {
            if(err){
                console.log(err)
            }else{

            }
            
            
            results(!err? null : err, data);
           
        });
    };
};



User.signIn = new function(){
    this.params = ["userName", "pass"];
};
module.exports = User;