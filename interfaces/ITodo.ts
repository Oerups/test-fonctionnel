import { Document } from 'mongoose';
import { ITask } from '../interfaces/ITask';

export interface ITodo extends Document { 
    title: string;
    description: string;
    tasks: Array<ITask>;
}