import { Schema, Document } from 'mongoose';

export interface User extends Document {
  name: any;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export const UserSchema = new Schema<User>({
  username: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});
