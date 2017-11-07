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


    return router; // Return router object to main index.js
};