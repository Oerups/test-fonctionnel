import { model, Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const User: Model<IUser> = model<IUser>('User', UserSchema);