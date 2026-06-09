const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();
const SECRET = process.env.SECRET_KEY;

const register = async (req,res) => {
    console.log('registering user');
    console.log('REQ BODY', req.body);
    try {
        const user = new User(req.body);
        const newUser = await user.save();
        console.log('NEW USER', newUser);
        const userToken = jwt.sign({
            _id: newUser._id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
        }, SECRET );
        res
            .status(201)
            .cookie('userToken', userToken, {
                expires: new Date(Date.now() + 1000000),
            })
            .json({
                successMessage: 'user created',
                user: {
                    id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                },
            })
    } catch(err) {
        res
            .status(400)
            .json({
                message: 'Something went wrong in register',
                error: err
            });
    }
};

const login = async (req, res) => {
    const userDoc = await User.findOne({ email: req.body.email});
    if (!userDoc) {
        return res.status(400).json({ message: 'Invalid Login'});
    } else {
        try {
            const isPasswordValid = await bcrypt.compare(req.body.password, userDoc.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid Login'});
            } else {
                const userToken = jwt.sign({
                    _id: userDoc._id,
                    email: userDoc.email,
                    firstName: userDoc.firstName,
                    lastName: userDoc.lastName,
                }, SECRET );
                res
                    .cookie('userToken', userToken, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 1000000),
                    })
                    .json({
                        successMessage: 'user logged in',
                        user: {
                            _id: userDoc._id,
                            email: userDoc.email,
                            firstName: userDoc.firstName,
                            lastName: userDoc.lastName,
                        },
                    });
            }
        } catch(err) {
            console.error(err);
            return res.status(400).json({ message: 'Invalid Login'});
        }
    }
};

const logout = (req, res) => {
    console.log('logging out');
    return res.clearCookie('userToken', {
        httpOnly: true
    }).json({
        message: 'You are logged out'
    });
};

const getLoggedInUser = async (req, res) => {
    try {
        console.log(req.cookies);
        console.log(req.cookies.userToken);
        const userPayLoad = jwt.verify(
            req.cookies.userToken,
            SECRET
        );
        console.log('USER', userPayLoad);

        const user = await User.findById(userPayLoad._id);
        
        if (!user) {  
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.json({
            user: {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            }
        });
    } catch(err) {
        console.log('ERROR', err);
        return res.status(400).json({ 
            message: 'Something went wrong in getting logged in user',
            error: err
        });
    }
};

const getUsers = async (req, res) => {
    User.find()
        .then((allUsers) => {
            res.json(allUsers);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in user:findAll', error: err });
        });
}

const deleteUser = async (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then((user) => {
            console.log('DELETE:', user);
            res.json(user);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in user:delete', error: err });
        });
}

module.exports = { //Controls for User
    register,
    login,
    logout,
    getLoggedInUser,
    getUsers,
    deleteUser,
};