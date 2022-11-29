const express = require('express');
const User = require('../Model/User.model');
const Certification = require('../Model/Certification.model');
const Validate = require('../MiddleWare/Validate');
const Authenticate = require('../MiddleWare/Authenticate');
const{
 signIn,
 Register,
 SearchByName,
 UpdateProfile,
 SearchHistoryByName,
 SearchActivityByName,
 CertifyUser
} = require('../Controllers/User.controller');



const Router = express.Router();

Router.route('/register').post(Validate(User.schema, User.createUser.params), Register);
Router.route('/getUser/:userName').get(Validate(User.schema, User.getUserByUserName.params), SearchByName);
Router.route('/signIn').post(Validate(User.schema, User.signIn.params),signIn);
Router.route('/updateProfile').put(Authenticate, Validate(User.schema, User.updateProfile.params), UpdateProfile);
Router.route('/getHistory/:userName').get(Validate(User.schema, User.getHistoryByUserName.params), SearchHistoryByName);
Router.route('/getActivity/:userName').get(Validate(User.schema, User.getActivityByUserName.params), SearchActivityByName);
Router.route('/certify').post(Authenticate, Validate(Certification.schema, Certification.certify.params), CertifyUser);

module.exports = Router;