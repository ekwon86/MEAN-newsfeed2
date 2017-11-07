const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    uri: 'mongodb://localhost:27017/MEAN-newsfeed2',
    secret: crypto,
    db: 'MEAN-newsfeed2'
};