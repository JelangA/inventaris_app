const jwt = require('jsonwebtoken');
const respon = require('../utils/responseHelpers');

const mid = {};

mid.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return respon.responseErr(res, 'Authorization is needed', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return respon.responseErr(res, 'Token is missing', 401);
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (error) {
        return respon.responseErr(res, 'Invalid token', 401);
    }
};



module.exports = mid;
