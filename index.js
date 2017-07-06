const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config.json');
const routes = require('./routes/');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo, { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

mongoose.connect(config.mongo, { useMongoClient: true })

app.listen(config.port, console.log(`server is run on port ${config.port}`));