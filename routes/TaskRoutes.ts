import {Router} from "express";
import {TaskController} from "../controllers/taskController";

export class TaskRoutes {
    static routes(): Router {
        return Router()
            .get('/all', TaskController.findAll)
            .post('/', TaskController.createAndRun)
            .get('/:id', TaskController.runOne)
    }
}