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
        const errors = validationResult(request.body);
        if(errors.isEmpty()){
        //next function is not a return function ; the stuff after it will run
            console.log("Validated request with params:")
            console.log(request.body)
            next();
        }
        else{
        console.log("validation has failed"+errors);
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
            next();
    }
    }
];
