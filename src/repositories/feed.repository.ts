import {
  FeedDeletionError,
  FeedRetrievalError,
} from './../errors/feed.repository.error';
import { FeedCreationError } from '../errors/feed.repository.error';
import { FeedModel, IFeed } from '../models/feed.model';

class FeedRepository {
  public static async createFeed(data: Partial<IFeed>): Promise<IFeed> {
    try {
      const feed = new FeedModel(data);
      return await feed.save();
    } catch (error) {
      throw new FeedCreationError(error);
    }
  }
  public static async getFeeds(): Promise<IFeed[]> {
    try {
      return await FeedModel.find().sort({ date: -1 }).exec();
    } catch (error) {
      throw new FeedRetrievalError(error);
    }
  }

  public static async getFeedById(id: string): Promise<IFeed | null> {
    try {
      return await FeedModel.findById(id).exec();
    } catch (error) {
      throw new FeedRetrievalError(error);
    }
  }

  public static async deleteFeed(id: string): Promise<IFeed | null> {
    try {
      return await FeedModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new FeedDeletionError(error);
    }
  }
}

export default FeedRepository;
