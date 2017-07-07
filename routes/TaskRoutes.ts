import {Router} from "express";
import {TaskController} from "../controllers/taskController";

export class TaskRoutes {
    static routes(): Router {
        return Router()
            .post('/', TaskController.createAndRun)
            .get('/:id', TaskController.runOne)
    }
}