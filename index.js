const mongoose = require('mongoose');
const jayson = require('jayson');
const requireDir = require('require-dir');
const config = require('./config.json');

const methods = requireDir('methods');
const server = jayson.server(methods);

mongoose.connect(config.mongo)
  .then(() => console.log('MongoDb connected'));

server.http().listen(config.port, console.log(`RPC server is run on port : ${config.port}`));
