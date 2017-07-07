import { mongoose } from "../database/database";
import { Schema, Model, Document } from "mongoose";

export interface ITask {
    title: string;
    create?: Date;
    description?: string;
    start?: string;
    end?: string;
    days?: Array<string>
    filePath: string;
    command: string;
    stderr: string;
    stdout: string;
    exitCode: number;
    status: string;
}

interface ITaskModel extends ITask, mongoose.Document { }

const schema = new Schema({
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

export const Task = mongoose.model<ITaskModel>("tasks", schema);