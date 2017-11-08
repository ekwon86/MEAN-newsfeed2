/** Import Node Modules **/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


/** PASSWORD VALIDATOR RULES **/
let passwordLengthChecker = (password) => {
    if(!password) {
        return false;
    } else {
        if(password.length < 8 || password.length > 35) {
            return false;
        } else {
            return true;
        }
    }
};

let validPassword = (password) => {
    if(!password) {
        return false;
    } else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password);
    }
};

const passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: 'Password must be at least 8 characters but no more than 35'
    },
    {
        validator: validPassword,
        message: 'Password must have at least one uppercase, lowercase, special character, and number'
    }

];

/** USERNAME VALIDATOR RULES **/
let usernameLengthChecker = (username) => {
    if(!username) {
        return false;
    } else {
        if(username.length < 3 || username.length > 15) {
            return false;
        } else {
            return true;
        }
    }
};

let validUsername = (username) => {
    if(!username) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
};

const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: 'Username must be at least 3 characters long but no more than 15'
    },
    {
        validator: validUsername,
        message: 'Username must not contain any special characters'
    }
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


/** Encrypt user password before saving to DB **/
userSchema.pre('save', function(next) {
    // Ensure password is new or modified before applying encryption
    if(!this.isModified('password'))
        return next();
    // Apply encryption
    bcrypt.hash(this.password, null, null, (err, hash) => {
       if(err) return next(err);
       this.password = hash; // Apply encryption to password
       next(); // Exit middleware
    });
});


/** Compare password to encrypted password upon login **/
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);