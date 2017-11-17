const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

/** URL VALIDATORS **/
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

const integrationSchema = new Schema({
    url: {
        type: String,
        required: true,
        validate: urlValidators
    },
    imgPath: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Integration', integrationSchema);