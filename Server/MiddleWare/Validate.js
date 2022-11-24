const { checkSchema, validationResult } = require("express-validator")

const getObjFromKeyList = (obj, list) => {
    const toRet = {};
    list.forEach(item => {
        if(item in obj) toRet[item] = obj[item]
    });
    return toRet;
}

module.exports = (schema, parameters) => [
    
    checkSchema(getObjFromKeyList(schema, parameters)),

    (request, response, next) => {
        const errors = validationResult(request);
        if(errors.isEmpty())
            next();
        else
            response.status(400).json({
                status : "failure",
                errors : errors.array().map(item => {
                    return {
                        param : item.param,
                        msg : item.msg,
                        location : item.location,
                        value : item.value
                    }
                 })
            })
    }
];
