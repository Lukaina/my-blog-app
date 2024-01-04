import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface User extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export const UserModel = mongoose.model<User>('User', UserSchema);
