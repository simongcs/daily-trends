import mongoose, { Document, Schema } from 'mongoose';

export interface IFeed extends Document {
  title: string;
  link: string;
  source: string;
  date: Date;
}

const feedSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

export const FeedModel = mongoose.model<IFeed>('Feed', feedSchema);
