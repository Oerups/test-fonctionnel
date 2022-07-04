import { Document } from 'mongoose';

export interface ITask extends Document { 
    content: string;
    completed: boolean;
}