import { model, Schema, Model } from 'mongoose';
import { ITask } from '../interfaces/ITask';

const tasksSchema: Schema = new Schema({
    content: { type: String, required: true },
    completed: { type: Boolean, required: true },
});

export const Task: Model<ITask> = model<ITask>('Task', tasksSchema);