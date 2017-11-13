/** Import Node Modules **/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

/** NEWS ARTICLE SNIPPET VALIDATOR RULES **/
let snippetLengthChecker = (snippet) => {
    if(!snippet) {
        return false;
    } else {
        if(snippet.length < 25 || snippet.length > 300) {
            return false;
        } else {
            return true;
        }
    }
};

const snippetValidators = [
    {
        validator: snippetLengthChecker,
        message: 'Snippet must be at least 25 characters but no more than 300'
    }
];

/** NEW ARTICLE URL VALIDATORS **/
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



const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    snippet: {
        type: String,
        required: true,
        validate: snippetValidators
    },
    url: {
        type: String,
        required: true,
        validate: urlValidators
    }
});

module.exports = mongoose.model('News', newsSchema);