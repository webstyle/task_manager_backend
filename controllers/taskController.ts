import * as express from 'express';
import {validate} from '../services/validation'
import {run} from '../services/exec';

const Tasks = require('../models/task');

export class TaskController {
    constructor() {}

    static createAndRun(req: express.Request, res: express.Response): express.Response {
        const schema = {
            "type": 'object',
            "properties": {
                "title": {type: 'string'},
                "command": {type: 'string'},
                "filePath": {type: 'string'},
                "saveAndRun": {type: 'boolean'}
            },
            "required": ['title'],
        };

        if (req.body.filePath) schema.required.push("filePath");
        if (req.body.command) schema.required.push("command");

        const error = validate(req.body, schema);
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
            if (!req.body.saveAndRun) return res.json({task: savedTask});
            run(savedTask, (stderr, stdout) => {
                res.json({task: savedTask, stderr, stdout});
            });
        });
    }

    static runOne(req: express.Request, res: express.Response): express.Response {
        if (!req.params.id) return res.json({message: 'ID required'});
        const id = req.params.id;

        Tasks.findById(id, (err, task) => {
            if (err) return res.json({message: err.message});
            if (!task) return res.json({message: 'task not found'});
            run(task, (stdout, stderr) => res.json({task, stdout, stderr}));
        });
    }
}
