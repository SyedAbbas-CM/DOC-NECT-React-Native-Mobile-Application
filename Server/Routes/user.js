const express = require('express');
const { validationResult } = require('express-validator');
const User = require('../Model/User.model');
const Validate = require('../MiddleWare/Validate');
const Authenticate = require('../MiddleWare/Authenticate');
const UserController = require('../Controllers/User.controller');
const{
 signIn,
 Register,
 SearchByName,
 UpdateProfile,
 SearchHistoryByName,
 SearchActivityByName
} = require('../Controllers/User.controller')



const Router = express.Router();

Router.route('/register').post(Validate(User.schema, User.createUser.params), Register);
Router.route('/getUser/:userName').get(Validate(User.schema, User.getUserByUserName.params), SearchByName);
Router.route('/signIn').post(Validate(User.schema, User.signIn.params),signIn);
Router.route('/updateProfile').put(Authenticate, Validate(User.schema, User.updateProfile.params), UpdateProfile);
Router.route('/getHistory/:userName').get(Validate(User.schema, User.getHistoryByUserName.params), SearchHistoryByName);
Router.route('/getActivity/:userName').get(Validate(User.schema, User.getActivityByUserName.params), SearchActivityByName);
module.exports = Router;