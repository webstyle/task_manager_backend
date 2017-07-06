const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: String,
  create: {
    type: Date,
    "default": Date.now
  },
  start: Date,
  end: Date,
  days: [{
    type: Date
  }],
  filePath: String,
  command: String,
  description: String,
  stderr: String,
  stdout: String,
  exitCode: Number,
  status: String
});

module.exports = mongoose.model('tasks', TaskSchema, 'tasks');
