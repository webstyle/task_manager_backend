import mongoose = require("mongoose");
import * as settings from '../settings';

mongoose.Promise = global.Promise;

mongoose.connect(settings.config.mongo);

export {mongoose};