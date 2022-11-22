const express = require('express');
const { query, validationResult } = require('express-validator');
const db = require('../DB');

const user = express.Router();
/*
    1) There should only be a single record with that email. (Implemented through unique constraint in mysql)
    2) If there are no records with that email. Respond "Email or password does not match."
    3) If the record exists but the password does not match. Respond "Email or password does not match."
    4) If email exists and password matches, the sign user in.
 */
user.get(
    '/signin',  
    /* Validating query parameters */
    [
        query('email')
            .isString()
            .isEmail(),
        query('password')
            .isString()
            .isLength({min : 4})
    ],

    (req, res) => {
        /* Validating query parameters */
        const validationErrors = validationResult(req);

        if(!validationErrors.isEmpty()){
            res.status(400).json({
                status : "Failure",
                errorCode : validationErrors.array()[0].msg
            });
            return;
        }
        
        db.query('SELECT * FROM User WHERE email = ?', [req.query.email], (err, data) => {
            if(err){
                throw err;
            }
            if(data.length == 0){
                res.status(400).json({
                    status : "Failure",
                    errorCode : "auth/invalid-email-password"
                });
            }            
            else if(req.query.password !== data[0].pass){
                res.status(400).json({
                    status : "Failure",
                    errorCode : "auth/invalid-email-password"
                });
            }
            else{
                res.status(200).json({
                    status : "Success"
                })
            }
    });
});

user.post('/register',(req,res)=>{
   /* Need to validate query parameters */   
    db.query('INSERT INTO User(email, pass) values(?, ?)', [req.query.email, req.query.pass], (err, data) => {
        if(err){
            console.log('>>>>>ERROR<<<<<');
            throw err;
        }
        else{
            console.log('USER REGISTERD!');
            res.status(200).json(data);
        }
    });
});

module.exports = user;