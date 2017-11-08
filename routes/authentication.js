const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {
    /** REGISTER USER ROUTE **/
    router.post('/register', (req, res) => {
        if(!req.body.username) {
            res.json({ success: false, message: 'You must provide a username' });
        } else {
            if(!req.body.password) {
                res.json({ success: false, message: 'You must provide a password' });
            } else {
                // Create new user object and apply user input
                let user = new User({
                    username: req.body.username,
                    password: req.body.password
                });
                // Save user to database
                user.save((err) => {
                    if(err) {
                        // Check if error is an error of duplicated username
                        if(err.code === 11000) {
                            res.json({ success: false, message: 'Username already exists' });
                        } else {
                            // Check if error is a validation error
                            if(err.errors) {
                                if(err.errors.username) {
                                    res.json({ success: false, message: err.errors.username.message });
                                } else {
                                    // Check if error is in the password field
                                    if(err.errors.password) {
                                        res.json({ success: false, message: err.errors.password.message });
                                    } else {
                                        res.json({ success: false, message: err });
                                    }
                                }
                            } else {
                                res.json({ success: false, message: 'Could not save user, Error: ', err }); // Return error if not related to validation
                            }
                        }
                    } else {
                        res.json({ success: true, message: 'Account registered.' });
                    }
                });
            }
        }
    });

    /** USER LOGIN ROUTE **/
    router.post('/login', (req, res) => {
        if(!req.body.username) {
            res.json({ success: false, message: 'No username was provided' });
        } else {
            if(!req.body.password) {
                res.json({ success: false, message: 'No password was provided' });
            } else {
                User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                    if(err) {
                        res.json({ success: false, message: err });
                    } else {
                        if(!user) {
                            res.json({ success: false, message: 'Username was not found' });
                        } else {
                            const validPassword = user.comparePassword(req.body.password);
                            if(!validPassword) {
                                res.json({ success: false, message: 'Password invalid' });
                            } else {
                                const token = jwt.sign({ userId: user._id}, config.secret, { expiresIn: '24h' });
                                res.json({ success: true, message: 'Success!', token: token, user: {
                                    username: user.name
                                }})
                            }
                        }
                    }
                });
            }
        }
    });


    return router; // Return router object to main index.js
};