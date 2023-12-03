const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/responseBuilder');

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decodedToken;
        next();
    } catch (error) {
        res.status(401).json(errorResponse(401, 'Invalid or expired token!'));
    }
}

const checkAuthRole = (role=['PARTICIPANT']) => {
    return (req, res, next) => {
        if(!role.includes(req.userData.role)) 
            return res.status(403).json(errorResponse(403, 'Forbidden access'));
        
        next();
    }
}

module.exports = {checkAuth, checkAuthRole};