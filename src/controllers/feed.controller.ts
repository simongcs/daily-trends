import { Request, Response, NextFunction } from 'express';
import FeedService from '../services/feed.service';

class FeedController {
  private feedService: FeedService;

  constructor(feedService: FeedService) {
    this.feedService = feedService;
  }

  public async getFeeds(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const feeds = await this.feedService.getFeeds();
      res.status(200).json(feeds);
    } catch (error) {
      next(error);
    }
  }

  public async getFeedById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const feedId = req.params.id;
      const feed = await this.feedService.getFeedById(feedId);
      if (!feed) {
        res.status(404).json({ message: 'Feed not found' });
      }
      res.status(200).json(feed);
    } catch (error) {
      next(error);
    }
  }

  public async createFeed(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const newFeed = await this.feedService.createFeed(req.body);
      res.status(201).json(newFeed);
    } catch (error) {
      next(error);
    }
  }

  public async deleteFeed(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const feedId = req.params.id;
      const deletedFeed = await this.feedService.deleteFeed(feedId);
      if (!deletedFeed) {
        res.status(404).json({ message: 'Feed not found' });
      }
      res.status(200).json({ message: 'Feed deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export default FeedController;
