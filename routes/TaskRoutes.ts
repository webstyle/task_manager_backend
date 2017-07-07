import {Router} from "express";
import task = require('../controllers/taskController');

export class TaskRoutes {
    static routes(): Router {
        return Router()
            .post('/', task.createAndRun)
            .get('/:id', task.runOne)
    }
}