const { checkSchema } = require("express-validator");
const db = require("../DB");

const Certification = {};

Certification.schema = {
    docUserName: {
        isString: true,
        isLength: {
            options: {
                min: 3
            }
        }
    },
    instituteName: {
        isString: true,
        isLength: {
            options: {
                min: 3
            }
        }
    },
    degreeTitle: {
        isString: true,
        isLength: {
            options: {
                min: 2
            }
        }
    },
    startDate: {
        isString: true,
        isDate: true,
    },
    endDate: {
        isString: true,
        isDate: true,
    }
};

Certification.certify = new function(){
    this.params = ["instituteName", "degreeTitle", "startDate", "endDate"];
    this.service = (data, results) => {
        console.log(data);
        let sql = "UPDATE User SET userRole='DOCTOR' WHERE userName = ?; \
                   INSERT INTO Doctor(userName) values(?); \
                   INSERT INTO Certification values(?, ?, ?, str_to_date(?, \'%Y-%m-%d\'), str_to_date(?, \'%Y-%m-%d\'));";
        db.query(sql, 
                [data.docUserName,
                data.docUserName,
                data.docUserName,
                data.instituteName,
                data.degreeTitle,
                data.startDate,
                data.endDate],
                (err, data) => results(!err? null : err, data));
    }
}

module.exports = Certification;