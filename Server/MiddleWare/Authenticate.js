const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if(!token) return response.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return response.status(400).json({
                errorCode : "auth/unauthorized-access"
           });
        }

        request.user = user;
        next();
    });
};