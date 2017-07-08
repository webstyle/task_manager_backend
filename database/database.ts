import mongoose = require("mongoose");
import {config} from '../settings';

mongoose.Promise = global.Promise;

mongoose.connect(config.mongo);

export {mongoose};