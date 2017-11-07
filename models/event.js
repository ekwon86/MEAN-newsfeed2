/** Import Node Modules **/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

/** EVENT NAME VALIDATOR RULES **/
let nameLengthChecker = (name) => {
    if(!name) {
        return false;
    } else {
        if(name.length < 5 || name.length > 50) {
            return false;
        } else {
            return true;
        }
    }
};

let alphaNumericChecker = (name) => {
    if(!name) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-z\d\-_\s]+$/i);
        return regExp.test(name);
    }
};

const nameValidators = [
    {
        validator: nameLengthChecker,
        message: 'Name must be more than 5 characters but no more than 50'
    },
    {
        validator: alphaNumericChecker,
        message: 'Name must only contain alphanumeric characters'
    }
];

/** EVENT CITY VALIDATORS **/
let alphaNumericWithSpacesChecker = (city) => {
    if(!city) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-z\d\-_\s]+$/i);
        return regExp.test(city);
    }
};
const cityValidators = [
    {
        validator: alphaNumericWithSpacesChecker,
        message: 'City name must only contain alphanumeric characters'
    }
];

/** EVENT URL VALIDATORS **/
let validUrlChecker = (url) => {
    if(!url) {
        return false;
    } else {
        const regExp = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
        return regExp.test(url)
    }
};

const urlValidators = [
    {
        validator: validUrlChecker,
        message: 'Please enter a valid url'
    }
];


const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: nameValidators
    },
    date: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true,
        validate: cityValidators
    },
    state: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        validate: urlValidators
    }
});

module.exports = mongoose.model('Event', eventSchema);