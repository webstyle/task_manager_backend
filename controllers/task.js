const validation = require('../services/validation');
const Task = require('../models/task');
const exec = require('../services/exec');

function createAndRun(req, res) {
  const schema = {
    "type": 'object',
    "properties": {
      "title": { type: 'string' },
      "command": { type: 'string' },
      "filePath": { type: 'string' },
    },
    "required": ['title'],
  };

  if (req.body.filePath) schema.required.push("filePath");
  if (req.body.command) schema.required.push("command");

  const error = validation(req.body, schema);
  if (!error.valid) {
    return res.json(error);
  }

  let task = new Task({
    title: req.body.title,
    command: req.body.command || '',
    filePath: req.body.filePath || ''
  });

  task.save((err, savedTask) => {
    if (err) return res.json(err.message);
    exec(savedTask, (stderr, stdout) => {
      res.json({ task: savedTask, stderr, stdout });
    });
  });
}

function runOne(req, res) {
  if (!req.params.id) return res.json({ message: 'ID required' });
  const id = req.body.id;

  Task.findOne({ _id: id }, (err, task) => {
    if (err) return res.json({ message: err.message });

    exec(task, (stdout, stderr) => res.json({ task, stdout, stderr }));
  });
}


module.exports.createAndRun = createAndRun;
module.exports.runOne = runOne;
