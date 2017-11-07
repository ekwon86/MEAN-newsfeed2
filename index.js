/** Import Node Modules **/
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config/database');
const path = require('path');
// const authentication = require('./routes/authentication')(router);
// const events = require('./routes/event')(router);
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;

/** DB Connection **/
mongoose.connect(config.uri, (err) => {
    if(err) {
        console.log('Could NOT connect to database ', err);
    } else {
        console.log('Connected to database: ' + config.db);
    }
});

/** Middleware **/
app.use(cors({ origin: 'http://localhost:4200 '}));
app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json
app.use(express.static(__dirname + '/client/dist/')); // Provide static directory for frontend
// app.use('/authentication', authentication);
// app.use('/blogs', blogs);

/** Connect server to Angular 2 index.html **/
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

/** Start Server: listen on port 8080 **/
app.listen(port, () => {
    console.log('Listening on port ' + port);
});