import { model, Schema, Model, Document } from 'mongoose';
import { ITodo } from '../interfaces/ITodo';

const todoSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const Todo: Model<ITodo> = model<ITodo>('Todo', todoSchema);