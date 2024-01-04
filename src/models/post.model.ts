import { Schema, Document } from 'mongoose';

export interface Post extends Document {
  title: string;
  content: string;
  categories: string[];
  userId: string;
}

export const PostSchema = new Schema<Post>({
  title: String,
  content: String,
  categories: [String],
  userId: Schema.Types.ObjectId,
});
