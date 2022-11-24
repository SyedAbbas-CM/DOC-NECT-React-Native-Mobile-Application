const express = require('express');
const { validationResult } = require('express-validator');
const User = require('../Model/User.model');
const Validate = require('../MiddleWare/Validate');
const UserController = require('../Controllers/User.controller');

const user = express.Router();

user.post(
        '/register', 
        Validate(User.schema, User.createUser.params),
        UserController.createUserController
);

user.get(
        '/getUser/:userName', 
        Validate(User.schema, User.getUserByUserName.params),
        UserController.getUserByUserNameController
);

user.post(
        '/signIn',
        Validate(User.schema, User.signIn.params),
        UserController.signInController
);
module.exports = user;