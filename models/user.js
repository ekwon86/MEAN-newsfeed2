/** Import Node Modules **/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


/** PASSWORD VALIDATOR RULES **/
const passwordValidators = [

];

/** USERNAME VALIDATOR RULES **/
const usernameValidators = [

];


/** User model definition **/
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        validate: usernameValidators
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidators
    }
});

module.exports = mongoose.model('User', userSchema);