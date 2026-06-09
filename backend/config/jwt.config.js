const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_KEY;

module.exports.authenticate = async (req, res, next) => {
    try {
        const userPayLoad = jwt.verify(req.cookies.userToken,secret);
        const user = await User.findOne({ _id: userPayLoad._id });
        next();
    } catch (err) {
        res.status(401).json({verified: false, error: err});
    }
    
}