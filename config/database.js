const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    // DEVELOPMENT
    // uri: 'mongodb://localhost:27017/MEAN-newsfeed2',
    // PRODUCTION
    uri: 'mongodb://admin:admin@ds153015.mlab.com:53015/mean-newsfeed',
    secret: crypto,
    db: 'MEAN-newsfeed2'
};