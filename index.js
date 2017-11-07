/** Import Node Modules **/
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
