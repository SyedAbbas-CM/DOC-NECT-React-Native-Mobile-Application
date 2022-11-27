const express = require('express');
const { validationResult } = require('express-validator');
const User = require('../Model/User.model');
const Validate = require('../MiddleWare/Validate');
const UserController = require('../Controllers/User.controller');
const{
 signIn,
 Register,
 SearchByName
} = require('../Controllers/User.controller')



const Router = express.Router();

Router.route('/register').post(  Validate(User.schema, User.createUser.params), Register);
Router.route('/getUser/:userName').get(Validate(User.schema, User.getUserByUserName.params),SearchByName);
Router.route('/signIn').post(Validate(User.schema, User.signIn.params),signIn);


module.exports = Router;