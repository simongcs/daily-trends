import {
  FeedDeletionError,
  FeedRetrievalError,
} from './../errors/feed.repository.error';
import { FeedCreationError } from '../errors/feed.repository.error';
import { FeedModel, IFeed } from '../models/feed.model';

class FeedRepository {
  private feedModel: typeof FeedModel;

  constructor(feedModel: typeof FeedModel) {
    this.feedModel = feedModel;
  }

  public async createFeed(data: Partial<IFeed>): Promise<IFeed> {
    try {
      const feed = await this.feedModel.create(data);
      return feed;
    } catch (error) {
      throw new FeedCreationError(error);
    }
  }

  public async bulkCreateFeeds(feeds: IFeed[]): Promise<IFeed[]> {
    try {
      const createdFeeds = await this.feedModel.insertMany(feeds);
      return createdFeeds;
    } catch (error) {
      throw new FeedCreationError(error);
    }
  }

  public async getFeeds(): Promise<IFeed[]> {
    try {
      return await this.feedModel.find().sort({ date: -1 }).exec();
    } catch (error) {
      throw new FeedRetrievalError(error);
    }
  }

  public async getFeedById(id: string): Promise<IFeed | null> {
    try {
      return await this.feedModel.findById(id).exec();
    } catch (error) {
      throw new FeedRetrievalError(error);
    }
  }

  public async deleteFeed(id: string): Promise<IFeed | null> {
    try {
      return await this.feedModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new FeedDeletionError(error);
    }
  }
}

export default FeedRepository;
