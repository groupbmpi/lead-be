const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/responseBuilder');

const checkAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decodedToken;     // set userData request object
        next();
    } catch (error) {
        res.status(401).json(errorResponse(401, 'Invalid or expired token! Login to continue'));
    }
}

const checkAuthRole = (role) => {
    return (req, res, next) => {
        if(!role.includes(req.userData.role))    // get userData from checkAuth middleware
            return res.status(403).json(errorResponse(403, 'Forbidden access'));
        
        next();
    }
}


module.exports = {checkAuth, checkAuthRole };