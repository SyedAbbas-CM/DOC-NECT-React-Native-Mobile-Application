const { query, checkSchema, check } = require('express-validator');
const db = require('./../DB');

const User = {};
User.schema = {
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
        joinDate: {
            isDate: true,
        },
        theme: {
            isString : true,
            isIn : {
                options : [['LIGHT', 'DARK']]
            } 
        },
        privacy: {
            isString : true,
            isIn : {
                options : [['0', '1', '2']]
            } 
        }
    };
    
User.createUser = new function(){
    this.params = ["userName", "pass", "userRole", "firstName", "lastName", "email", "dob"];
    this.service = (data, results) => {
        //placeholder ? are injection proof
        const sql = 'INSERT INTO User(userName, pass, userRole, firstName, lastName, email, dob, theme, privacy) values(?, ?, ?, ?, ?, ?, str_to_date(?, \'%Y-%m-%d\'), ?, ?)';
        db.query(sql, [data.userName,data.pass,data.userRole,data.firstName,data.lastName,data.email, data.dob, 'LIGHT', '0'], (err, data) => {
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
        const sql = `SELECT * FROM User WHERE userName = ?`;
        db.query(sql, [data.userName], (err, data) => {
            if(err){
                console.log(err)
            }
            else{  
            }
            results(!err? null : err, data);
        });
    };
};


User.getDoctorDetailsByUserName = new function(){
    this.params = ["userName"];
    this.service = (data, results) => {
        const sql = `SELECT * FROM DOCTOR, CERTIFICATION WHERE DOCTOR.userName = CERTIFICATION.userName AND DOCTOR.userName = ?;`;
        db.query(sql, [data.userName, data.userName], (err, data) => {
            if(err){
                console.log(err)
            }
            else{  
                
            }
            console.log(data)
            results(!err? null : err, data);
        });
    };
};


User.getCertificationByUserName = new function(){
    this.params = ["userName"];
    this.service = (data, results) => {
        const sql = `SELECT * FROM CERTIFICATION WHERE userName = ?`;
        db.query(sql, [data.userName], (err, data) => {
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
        const sql = `SELECT * FROM User WHERE email = ?`;
        db.query(sql, [data.email], (err, data) => {
            results(!err? null : err, data);
        });
    };
};

User.getPasswordbyEmail = new function(){
    this.params = ["email"];
    this.service = (data, results) => {
        const sql = `SELECT pass FROM User WHERE email = ?`;
        db.query(sql, [data.email], (err, data) => {
            results(!err? null : err, data);
           
        });
    };
};

User.signIn = new function(){
    this.params = ["userName", "pass"];
};

User.updateProfile = new function(){
    this.params = ["firstName", "lastName", "email", "dob", "city", "gender", "about"];
    this.service = (data, results) => {
        const { userName, ...restData } = data;
        let sql = "UPDATE User SET " + Object.keys(restData).join(" = ? ,") +" = ? WHERE userName = ?";
        db.query(sql, [...Object.values(restData), userName], (err, data) => {
            results(!err ? null : err, data);
        });
    }
};


User.getActivityByUserName = new function(){
    this.params = ["userName"];
    this.service = (data, results) => {
        const sql = `SELECT * FROM POST WHERE userName = ?`;
        db.query(sql, [data.userName], (err, data) => {
            if(err){
                console.log(err)
            }
            else{

            }
            results(!err? null : err, data);
        });
    };
};


User.getSettingsByUserName = new function(){
    this.params = ["userName"];
    this.service = (data, results) => {
        const sql = `SELECT theme, privacy FROM USER WHERE userName = ?`;
        db.query(sql, [data.userName], (err, data) => {
            if(err){
                console.log(err)
            }
            else{

            }
            
            results(!err? null : err, data);
        });
    };
};


User.updateSettings = new function(){
    this.params = ["theme", "privacy"];
    this.service = (data, results) => {
        const { userName, ...restData } = data;
        let sql = "UPDATE User SET " + Object.keys(restData).join(" = ? ,") +" = ? WHERE userName = ?";
        db.query(sql, [...Object.values(restData), userName], (err, data) => {
            results(!err ? null : err, data);
        });
    }
};


module.exports = User;