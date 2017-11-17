const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const featureSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgPath: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Feature', featureSchema);