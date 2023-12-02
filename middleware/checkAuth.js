const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ 
            success: false,
            error: {
                code: 401,
                message: 'Invalid or expired token!',
            }
        });
    }
}

module.exports = {checkAuth};