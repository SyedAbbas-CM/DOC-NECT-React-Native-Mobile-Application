const User = require("../Model/user.model");
const Certification = require("../Model/Certification.model");
const asyncWrapper = require('../middleware/async')
const jwt = require("jsonwebtoken");

const Register = asyncWrapper(async (req, res, next) => {
    console.log(req.body);
    User.getUserByUserName.service({ userName: req.body.userName }, (dbError, data1) => {
        if (dbError) {
            console.log(">>>Database is down<<<")
            res.status(400).json({
                errorCode: "db/unknown-error",
            });
        }
        else {
            console.log(data1)
            if (data1.length !== 0) { /* Username already exists */
                console.log(">>>User name already exists<<<")
                res.status(401).json({
                    errorCode: "auth/username-exists"
                });
            }
            else {
                User.getUserByEmail.service({ email: req.body.email }, (dbError, data2) => {
                    if (dbError) {
                        console.log(">>>email already exists<<<")
                        res.status(402).json({
                            errorCode: "db/unknown-error",
                        });
                    }
                    else {
                        if (data2.length != 0) { /* Email already exists */
                            console.log("email already exists")
                            res.status(403).json({
                                errorCode: "auth/email-exists"
                            });
                        }
                        else {
                            User.createUser.service(req.body, (dbError) => {
                                if (dbError) {
                                    console.log("DB error2")
                                    res.status(404).json({
                                        errorCode: "db/unknown-error",
                                    });
                                }
                                else {
                                    const accessToken = jwt.sign(
                                        { userName: req.body.userName, userRole: req.body.userRole },
                                        process.env.ACCESS_TOKEN_SECRET,
                                        { expiresIn: '1d' }
                                    );
                                    console.log(accessToken);
                                    res.status(200).json({
                                        data: [req.body],
                                        accessToken: accessToken,
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }
    });
})
const SearchByName = asyncWrapper(async (req, res) => {
    User.getUserByUserName.service(req.params, (dbError, data) => {
        if (dbError) {
            res.status(400).json({
                errorCode: "db/unknown-error",
            });
        }
        else
            res.status(200).json({
                data: data
            });
    });
})
const SearchByEmail = (req, res) => {
    User.getUserByEmail.service(req.params, (dbError, data) => {
        if (dbError) {
            res.status(400).json({
                errorCode: "db/unknown-error",
            });
        }
        else
            res.status(200).json({
                data: data
            });
    });
}
const signIn = asyncWrapper(async (req, res, next) => {
    User.getUserByUserName.service({ userName: req.body.userName }, (dbError, data) => {
        if (dbError) {
            res.status(400).json({
                errorCode: "db/unknown-error",
            });
        }
        else {
            if (data.length == 0) { /* username doesnt exists */
                return res.status(400).json({
                    errorCode: "auth/invalid-username-password"
                });
            }
            else {
                if (req.body.pass == data[0].pass) {
                    const accessToken = jwt.sign(
                        { userName: req.body.userName, userRole: req.body.userRole },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '1d' }
                    );
                    console.log(accessToken)
                    res.status(200).json({
                        data: data,
                        accessToken: accessToken,
                    });
                }
                else {
                    res.status(400).json({
                        errorCode: "auth/invalid-username-password"
                    });
                }
            }
        }
    });

})

const UpdateProfile = (req, res) => {
    User.updateProfile.service({ ...req.body, userName: req.user.userName }, (dbError, data) => {
        if (dbError) {
            return res.status(400);
        }
        res.status(200).json(data);
    });
}

const  SearchHistoryByName = asyncWrapper(async(req, res) => {
    User.getHistoryByUserName.service(req.params, (dbError, data) => {
        if(dbError){
            res.status(400).json({
                errorCode : "db/unknown-error",
            });
        }
        else
            res.status(200).json({
                data : data
            });
    });
})

const  SearchActivityByName = asyncWrapper(async(req, res) => {
    User.getActivityByUserName.service(req.params, (dbError, data) => {
        if(dbError){
            res.status(400).json({
                errorCode : "db/unknown-error",
            });
        }
        else
            res.status(200).json({
                data : data
            });
    });
})

const   CertifyUser = asyncWrapper(async(req, res) => {
    Certification.certify.service({docUserName : req.user.userName, ...req.body}, (dbError, data) => {
        if(dbError){
            console.log(dbError);
            res.status(400).json({
                errorCode : "db/unknown-error",
            });
        }
        else
            res.sendStatus(200);
    });
});



module.exports = {
        Register,
        signIn,
        SearchByEmail,
        SearchByName,
        UpdateProfile,
        SearchHistoryByName,
        SearchActivityByName,
        CertifyUser
}


