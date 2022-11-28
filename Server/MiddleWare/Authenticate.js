const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return response.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return response.sendStatus(404);
        request.user = user;
        next();
    });
};