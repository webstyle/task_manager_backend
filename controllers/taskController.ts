const validation = require('../services/validation');
const Tasks = require('../models/task');
const exec = require('../services/exec');

export function createAndRun(req, res) {
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

    let task = new Tasks({
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

export function runOne(req, res) {
    if (!req.params.id) return res.json({ message: 'ID required' });
    const id = req.params.id;

    Tasks.findById(id, (err, task) => {
        if (err) return res.json({ message: err.message });
        if (!task) return res.json({ message: 'task not found' });
        exec(task, (stdout, stderr) => res.json({ task, stdout, stderr }));
    });
}


