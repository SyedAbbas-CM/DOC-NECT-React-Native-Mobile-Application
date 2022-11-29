const { checkSchema } = require("express-validator");
const db = require("../DB");

const History = {};

History.schema = {
    recordId : {
        isInt : true,
    },
    ailmentName : {
        isString: true,
        isLength: {
            options: {
                min: 3,
                max: 50
            }
        }
    },
    description : {
        isString: true,
        isLength: {
            options: {
                max: 1000,
            }
        }
    },
    symptoms : {
        isString: true,
        isLength: {
            options: {
                max: 300,
                min: 30,
            }
        }
    },
    startDate : {
        isString: true,
        isDate: true,
    },
    endDate : {
        isString: true,
        isDate: true,    
    }
}


History.getHistoryByUserName = new function(){
    this.params = ["userName"];
    this.service = (data, results) => {
        console.log("history", data)
        const sql = `SELECT * FROM History WHERE userName = ?`;
        db.query(sql, [data.userName], (err, data) => {
            if(err){
                console.log(err)
            }
            else{

            }
            
            results(!err? null : err, data);
        });
    };
};

History.addRecord = new function(){
    this.params = ["userName", "ailmentName", "description", "symptoms", "startDate", "endDate"];
    this.service = (data, results) => {
        console.log("history", data)
        const sql = `INSERT INTO History (userName, ailmentName, description, symptoms, startDate, endDate) values(?, ?, ?, ?, str_to_date(?, \'%Y-%m-%d\'), str_to_date(?, \'%Y-%m-%d\'))`;
        db.query(sql, [data.userName, data.ailmentName, data.description, data.symptoms, data.startDate, data.endDate], (err, data) => {
            if(err){
                console.log(err)
            }
            else{

            }
            
            results(!err? null : err, data);
        });
    };
};


module.exports = History;