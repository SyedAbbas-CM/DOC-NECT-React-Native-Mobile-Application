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
        const sql = 'INSERT INTO User(userName, pass, userRole, firstName, lastName, email, dob) values(?, ?, ?, ?, ?, ?, str_to_date(?, \'%Y/%m/%d\'))';
        db.query(sql, this.params.map( key => data[key]), (err, data) => {
            results(!err? null : err, data);
        });
    };
};

User.getUserByUserName = new function(){
    this.params = ["userName"];
    this.service = (data, results) => {
        const sql = 'SELECT * FROM User WHERE userName = ?';
        db.query(sql, data.userName, (err, data) => {
            results(!err? null : err, data);
        });
    };
};

User.getUserByEmail = new function(){
    this.params = ["email"];
    this.service = (data, results) => {
        const sql = 'SELECT * FROM User WHERE email = ?';
        db.query(sql, data.email, (err, data) => {
            results(!err? null : err, data);
        });
    };
};

User.signIn = new function(){
    this.params = ["userName", "pass"];
};
module.exports = User;