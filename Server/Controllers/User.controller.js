const User = require("../Model/user.model");

module.exports = {
    createUserController : (req, res) => {
        User.getUserByUserName.service({ userName : req.body.userName}, (dbError, data1) => {
            if(dbError){
                res.status(400).json({
                    status : "failure",
                    errorCode : "db/unknown-error",
                    error : dbError /* only here for debugging purposes */
                });
            }
            else{
                if(data1.length != 0){ /* Username already exists */
                    res.status(400).json({
                        status : "failure",
                        errorCode : "auth/username-exists"
                    });
                }
                else{
                    User.getUserByEmail.service({email : req.body.email}, (dbError, data2) => {
                        if(dbError){
                            res.status(400).json({
                                status : "failure",
                                errorCode : "db/unknown-error",
                                error : dbError /* only here for debugging purposes */
                            });
                        }
                        else{
                            if(data2.length != 0){ /* Email already exists */
                                res.status(400).json({
                                    status : "failure",
                                    errorCode : "auth/email-exists"
                                });
                            }
                            else{
                                User.createUser.service(req.body, (dbError) => {
                                    if(dbError){
                                        res.status(400).json({
                                            status : "failure",
                                            errorCode : "db/unknown-error",
                                            error : dbError /* only here for debugging purposes */
                                        });
                                    }
                                    else
                                        res.status(200).json({
                                            status : "success",
                                            data : res.body
                                        });
                                });   
                            }
                        }
                    });
                }
            }
        });
    },
    getUserByUserNameController : (req, res) => {
        User.getUserByUserName.service(req.params, (dbError, data) => {
            if(dbError){
                res.status(400).json({
                    status : "failure",
                    errorCode : "db/unknown-error",
                    error : dbError
                });
            }
            else
                res.status(200).json({
                    status : "success",
                    data : data
                });
        });
    },
    getUserByUserEmailController : (req, res) => {
        User.getUserByEmail.service(req.params, (dbError, data) => {
            if(dbError){
                res.status(400).json({
                    status : "failure",
                    errorCode : "db/unknown-error",
                    error : dbError
                });
            }
            else
                res.status(200).json({
                    status : "success",
                    data : data
                });
        });
    },
    signInController : (req, res) => {
        User.getUserByUserName.service({ userName : req.body.userName}, (dbError, data) => {
            if(dbError){
                res.status(400).json({
                    status : "failure",
                    errorCode : "db/unknown-error",
                    error : dbError /* only here for debugging purposes */
                });
            }
            else{
                if(data.length == 0){ /* Username doesnt exists */
                    res.status(400).json({
                        status : "failure",
                        errorCode : "auth/invalid-email-password"
                    });
                }
                else if(data[0].pass !== req.body.pass){
                    res.status(400).json({
                        status : "failure",
                        errorCode : "auth/invalid-email-password"
                    });   
                }
                else{
                    res.status(400).json({
                        status : "success",
                        data : data
                    });   
                }
            }
        });
    }
};

