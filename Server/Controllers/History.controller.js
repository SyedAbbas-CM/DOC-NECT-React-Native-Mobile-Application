const History = require("../Model/History.model")
const asyncWrapper = require('../middleware/async')
const jwt = require("jsonwebtoken");


const  SearchHistoryByName = asyncWrapper(async(req, res) => {
    History.getHistoryByUserName.service(req.params, (dbError, data) => {
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


const addRecord = asyncWrapper(async(req, res) => {
    History.addRecord.service({userName : req.user.userName, ...req.body}, (dbError, data) => {
        if(dbError){
            res.status(400).json({
                errorCode : "db/unknown-error",
            });
        }
        else
            res.status(200).json({
                data : data
            });  
    })
})


module.exports = {
    SearchHistoryByName,
    addRecord
}