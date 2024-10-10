import { IFeed } from './../models/feed.model';
import FeedRepository from '../repositories/feed.repository';

class FeedService {
  feedRepository: FeedRepository;

  constructor(feedRepository: FeedRepository) {
    this.feedRepository = feedRepository;
  }

  public async getFeeds(): Promise<IFeed[]> {
    return await this.feedRepository.getFeeds();
  }

  public async createFeed(data: IFeed): Promise<IFeed> {
    return await this.feedRepository.createFeed(data);
  }

  public async bulkCreateFeeds(data: IFeed[]): Promise<IFeed[]> {
    return await this.feedRepository.bulkCreateFeeds(data);
  }

  public async getFeedById(id: string): Promise<IFeed | null> {
    return await this.feedRepository.getFeedById(id);
  }

  public async deleteFeed(id: string): Promise<IFeed | null> {
    return await this.feedRepository.deleteFeed(id);
  }
}

export default FeedService;
