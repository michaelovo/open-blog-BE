const jwt = require('jsonwebtoken');

function authCheck(req, res, next) {
    try {
        const BearerToken = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(BearerToken, process.env.JWT_KEY);
        req.userData = decodeToken;
        next();

    } catch (error) {
        return res.status(401).json({
            "status": false,
            "message": "Unauthorized",
            "error": error
        });
    }
}

module.exports = {
    authCheck: authCheck
}