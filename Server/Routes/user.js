const express = require('express');
const User = require('../Model/User.model');
const History = require('../Model/History.model')
const Certification = require('../Model/Certification.model');
const Validate = require('../MiddleWare/Validate');
const Authenticate = require('../MiddleWare/Authenticate');
const{
 signIn,
 Register,
 SearchByName,
 UpdateProfile,
 UpdateSettings,
 SearchActivityByName,
 SearchSettingsByName,
 CertifyUser
} = require('../Controllers/User.controller');
const {
    SearchHistoryByName,
    addRecord,
    deleteRecord,
    updateRecord
} = require('../Controllers/History.controller');
const { updateSettings } = require('../Model/User.model');


const Router = express.Router();

Router.route('/register').post(Validate(User.schema, User.createUser.params), Register);
Router.route('/getUser/:userName').get(Validate(User.schema, User.getUserByUserName.params), SearchByName);
Router.route('/signIn').post(Validate(User.schema, User.signIn.params),signIn);
Router.route('/updateProfile').put(Authenticate, Validate(User.schema, User.updateProfile.params), UpdateProfile);
Router.route('/getActivity/:userName').get(Validate(User.schema, User.getActivityByUserName.params), SearchActivityByName);


Router.route('/certify').post(Authenticate, Validate(Certification.schema, Certification.certify.params), CertifyUser);


Router.route('/getHistory/:userName').get(Validate(History.schema, History.getHistoryByUserName.params), SearchHistoryByName);
Router.route('/addRecord').post(Authenticate, Validate(History.schema, History.addRecord.params), addRecord);
Router.route('/updateRecord').put(Authenticate, Validate(History.schema, History.updateRecord.params), updateRecord);
Router.route('/deleteRecord').post(Authenticate, Validate(History.schema, History.deleteRecord.params), deleteRecord);


Router.route('/getSettings').get(Authenticate, Validate(User.schema, User.getSettingsByUserName.params), SearchSettingsByName);
Router.route('/updateSettings').post(Authenticate, Validate(User.schema, User.updateSettings.params), UpdateSettings);

module.exports = Router;