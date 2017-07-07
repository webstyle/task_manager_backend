import { mongoose } from "../database/database";
import { Schema, Model, Document } from "mongoose";

export interface ITask extends Document {
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

export interface ITaskModel extends Model<ITask> {
}

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

export const Task = mongoose.model<ITask>("tasks", schema) as ITaskModel;